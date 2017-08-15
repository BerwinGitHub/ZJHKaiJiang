/**
 * Created by Berwin on 2017/7/8.
 */

/**
 * 桌子上最多人数
 * @type {number}
 */
var TABLE_MAX_PLAYER = 7;

var GameView = cc.View.extend({

    TAG_HEADER: 1000,// 头像的TAG
    _seatNodes: null,
    _mySeatID: 0,// 我的位置的编号
    _seatsMapping: null,// 本地位置和服务器位置对应表
    _dealCardsNode: null,//
    _startTimeNode: null,

    ctor: function () {
        this._super(new GameController(this));
        var data = ccs.load(res.studio_room_layers_room_json);
        this.addChildToCenter(data.node);
        this._dealCardsNode = ccui.helper.seekNodeByName(data.node, "dealCards");
        this._startTimeNode = ccui.helper.seekNodeByName(data.node, "lbl_start");
        this._startTimeNode.visible = false;
        // 初始化按钮
        this._initButton(data.node);
        this._seatsMapping = [0, 1, 2, 3, 4, 5, 6];
        // 隐藏掉所有的位置
        this._seatNodes = [];
        this._initSeat(data.node);
        this._updateTable();

        var btnBack = ccui.helper.seekNodeByName(data.node, "btn_menu");
        btnBack.addClickEventListener(() => {
            cc.app.socketmgr.emit(CSMapping.C2S.EXIT_ROOM, null);
            cc.app.viewmgr.replaceView(new HallView());
        });
        cc.test = this;
    },

    /**
     * 初始化按钮
     * @param node
     * @private
     */
    _initButton: function (node) {
        var keyNames = ["btn_follow", "btn_giveup", "btn_compare", "btn_watch", "btn_add", "btn_follow_always", "btn_prepare"];
        var functions = [this._gameFollow, this._gameGiveup, this._gameCompare, this._gameWatch, this._gameAdd, this._gameFollowAlways, this._gamePrepare];
        for (var i = 0; i < keyNames.length; i++) {
            var btn = ccui.helper.seekNodeByName(node, keyNames[i]);
            btn.addClickEventListener(functions[i]);
        }
    },

    _initSeat: function (node) {
        for (var i = 0; i < TABLE_MAX_PLAYER; i++) {
            var seat = ccui.helper.seekNodeByName(node, "seat_" + i);
            seat.visible = (i == 0);
            this._seatNodes.push(seat);
            // 创建倒计时
            var cdParent = ccui.helper.seekNodeByName(seat, "count_down");
            var progress = new cc.ProgressTimer(new cc.Sprite("#studio/room/images/ui/count_down.png"));
            cdParent.addChildToCenter(progress);
            progress.setType(cc.ProgressTimer.TYPE_RADIAL);
            progress.setColor(cc.color.GREEN);
            progress.setPercentage(0);
        }
    },

    /**
     * 准备
     * @private
     */
    _gamePrepare: function (btn) {
        var opt = {action: $root.GameAction.PREPARE};
        var buffer = app.proto.bytesify($root.GameOperate, opt);
        cc.app.socketmgr.emit(CSMapping.C2S.GAMEING, JSON.stringify(buffer));
        btn.visible = false;
    },

    /**
     * 比牌
     * @private
     */
    _gameCompare: function (btn) {

    },

    /**
     * 看牌
     * @private
     */
    _gameWatch: function (btn) {

    },

    /**
     * 加注
     * @private
     */
    _gameAdd: function (btn) {

    },

    /**
     * 跟到底
     * @private
     */
    _gameFollowAlways: function (btn) {

    },

    /**
     * 跟注
     * @private
     */
    _gameFollow: function () {

    },

    /**
     * 弃牌
     * @private
     */
    _gameGiveup: function () {

    },

    // TODO 执行操作
    dealCard: function (firstSeatID) {
        // 有多少用户准备了
        var playerNum = Object.keys(this._viewController._preparedSeat).length;
        var cardCount = playerNum * 3, offsetX = 10.0;
        // 添加准备发的牌
        for (var i = 0; i < cardCount; i++) {
            var card = new cc.Sprite("#studio/room/images/cards/game_poker11.png");
            card.setPosition(i * offsetX, 0);
            this._dealCardsNode.addChild(card);
        }
        // 遍历所有位置
        for (var i = 0, dealIdx = 0; i < TABLE_MAX_PLAYER * 3; i++) {
            // 从发牌作为第一个开始
            var seatID = (i + firstSeatID) % TABLE_MAX_PLAYER;
            var data = this._viewController._preparedSeat[seatID]; // 在准备的用户里面找
            if (!data) // 该位置上没有准备，或者没人
                continue;
            var cardIdx = parseInt(dealIdx / playerNum);
            var aPoker = ccui.helper.seekNodeByName(this._getSeatNodeBySeatID(data.seatID), "poker_" + cardIdx);
            var cover = ccui.helper.seekNodeByName(aPoker, "cover");
            var flyCard = this._dealCardsNode.children[this._dealCardsNode.children.length - dealIdx - 1];
            flyCard.scale = aPoker.scale;
            var pos = this._dealCardsNode.convertToNodeSpace(cover.convertToWorldSpace(cc.p(cover.width / 2, cover.height / 2)));
            (function (flyCard, pos, aPoker, dealIdx) {
                flyCard.runAction(cc.sequence(cc.delayTime(dealIdx * 0.15 + 0.1), cc.moveTo(0.35, pos), cc.callFunc(() => {
                    aPoker.visible = true;
                }), cc.delayTime(0.1), cc.removeSelf()));
            })(flyCard, pos, aPoker, dealIdx);
            dealIdx++;
        }
    },

    /**
     * 开始倒计时
     * @param seatID
     * @param dt
     * @param finish
     */
    turnCountDown: function (seatID, dt, finish) {
        var seatNode = this._getSeatNodeBySeatID(seatID);
        var progress = ccui.helper.seekNodeByName(seatNode, "count_down").getChildren()[0];
        progress.color = cc.color.GREEN;
        var spawn = cc.spawn(cc.progressFromTo(dt, 0, 100), cc.tintTo(dt, 255, 0, 0));
        progress.runAction(cc.sequence(spawn, cc.callFunc(() => {
            finish && finish(seatNode);
        })));
    },

    /**
     * n秒后开始游戏
     * @param interval
     */
    startCountDown: function (end, finish) {
        var times = parseInt((end - Date.now()) / 1000);
        if (times < 0) // 开始的时间已经过去了
            return;
        this._startTimeNode.string = times + "秒后开始游戏";
        var seq = cc.sequence(cc.callFunc(() => {
            this._startTimeNode.string = parseInt((end - Date.now()) / 1000) + "秒后开始游戏";
        }), cc.delayTime(1.0)).repeat(times);
        this._startTimeNode.runAction(cc.sequence(seq, cc.callFunc(() => {
            finish && finish();
        }), cc.hide()));
        this._startTimeNode.visible = true;
    },

    _updateTable: function () {
        var table = cc.app.player.data.table;
        if (!table)
            return;
        var tableID = table.tableID ? table.tableID : 0;
        // 先找到我是几号
        var seats = table.seats;
        this._handleSeat(seats);
        // 初始化Seat
        seats.forEach((seat) => {
            // 将作为信息保存
            this._viewController.addToSeatEntity(seat);
            if (seat.isPrepared)
                this._viewController._preparedSeat[seat.seatID] = seat;
            this.updateSeat(seat);
        });
    },

    _handleSeat: function (seats) {
        seats.forEach((seat) => {
            if (seat.user.id == cc.app.player.user.id) {
                this._mySeatID = (seat.seatID ? seat.seatID : 0);
                var temp = this._seatsMapping.splice(this._seatsMapping.length - this._mySeatID, this._seatsMapping.length);
                this._seatsMapping = temp.concat(this._seatsMapping);
                return;
            }
        });
    },

    _getSeatNodeBySeatID: function (seatID) {
        return this._seatNodes[this._seatsMapping[seatID]];
    },

    updateSeat: function (seatData) {
        var seatID = seatData.seatID ? seatData.seatID : 0;
        var ccoin = seatData.callCoin ? seatData.callCoin : 0; // 下注的金额
        // node
        var seatNode = this._getSeatNodeBySeatID(seatID);
        var nCallCoin = ccui.helper.seekNodeByName(seatNode, "use_coin");
        var nName = ccui.helper.seekNodeByName(seatNode, "user_name");
        var nCoin = ccui.helper.seekNodeByName(seatNode, "user_coin");
        var nPrepare = ccui.helper.seekNodeByName(seatNode, "prepare");
        //
        nCallCoin.string = ccoin;
        nName.string = seatData.user.username;
        nCoin.string = seatData.user.coin;// 用户的金币
        nPrepare.visible = seatData.isPrepared;
        // avatar
        var header = ccui.helper.seekNodeByName(seatNode, "user_header");
        var headerBorder = ccui.helper.seekNodeByName(seatNode, "user_header_border");
        headerBorder.setLocalZOrder(100);
        var clip = new cc.Sprite("#studio/com/images/ui/user_face_mask_96.png");
        var faceClip = new cc.ClippingNode(clip);
        faceClip.setAlphaThreshold(0.01);
        var face = new HttpSprite(seatData.user.headerUrl);
        if (face) {
            face.setLocalZOrder(0);
            faceClip.addChildToCenter(face);
        }
        header.addChildToCenter(faceClip);
        seatNode.visible = true;
        // 隐藏牌
        for (var i = 0; i < 3; i++) {
            var card = ccui.helper.seekNodeByName(seatNode, "poker_" + i);
            if (!seatData.cards || seatData.cards.length <= 0) {
                card.visible = false;
            } else { // TODO 设置牌
            }
        }
    },

    removeSeat: function (seatData) {
        var seatID = seatData.seatID ? seatData.seatID : 0;
        cc.app.toast.makeToask("移除的SeatID:" + seatID, 3).show();
        var seatNode = this._getSeatNodeBySeatID(seatID);
        seatNode.visible = false;
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});

var GameController = cc.ViewController.extend({

    _seatEntities: null,

    _preparedSeat: null,

    onLogic: function () {
        this._super();
        this._seatEntities = {};
        this._preparedSeat = {};
        cc.app.events.onNode(this._target, CSMapping.S2C.USER_ENTER_TABLE, (d) => this.somebodyEnetered(d));
        cc.app.events.onNode(this._target, CSMapping.S2C.USER_EXIT_TABLE, (d) => this.somebodyExited(d));
        cc.app.events.onNode(this._target, CSMapping.S2C.GAMEING, (d) => this.pollingExecute(d));

    },

    /**
     * 轮询执行
     */
    pollingExecute: function (data) {
        var go = cc.app.proto.parseFromArrayString($root.GameOperate, data);
        if (go.action == $root.GameAction.PREPARE) { // 用户准备
            var seat = this._seatEntities[go.seatID];
            seat.isPrepared = true;
            this._preparedSeat[seat.seatID] = seat;
            this._prepare(seat);
        } else if (go.action == $root.GameAction.COUNTDOWN_START) { // 倒计时开始
            this._target.startCountDown(go.millis.toNumber());
        } else if (go.action == $root.GameAction.SEND_CARD) { // 发牌
            this._target.dealCard(go.seatID ? go.seatID : 0);
        } else if (go.action == $root.GameAction.TURN) { // 该自己操作
            var seatID = go.seatID ? go.seatID : 0;
            this._target.turnCountDown(seatID, go.millis.toNumber() / 1000.0, () => {
            });
        } else if (go.action == $root.GameAction.END) { // 一轮结束
            this._preparedSeat = null;
        }
    },

    _prepare: function (seat) {
        this._target.updateSeat(seat);
    },

    somebodyEnetered: function (data) {
        var seat = cc.app.proto.parseFromArrayString($root.Seat, data);
        this.addToSeatEntity(seat);
        // 更新位置信息
        this._target.updateSeat(seat);
    },

    somebodyExited: function (data) {
        var seat = cc.app.proto.parseFromArrayString($root.Seat, data);
        this.removeFromSeatEntity(seat);
        this._target.removeSeat(seat);

    },

    addToSeatEntity: function (seat) {
        // Seat添加到Entity中，便后面使用
        var seatID = seat.seatID ? seat.seatID : 0;
        this._seatEntities[seatID] = seat;
    },

    removeFromSeatEntity: function (seat) {
        // Seat从Entity移除
        var seatID = seat.seatID ? seat.seatID : 0;
        this._seatEntities[seatID] = null;
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

});
//
// var a = {
//     "tableID": 1,
//     "seats": [{
//         "user": {
//             "objectId": "e7e86374f3",
//             "username": "Berwin",
//             "mobilePhoneNumber": "18200387036",
//             "diamond": 1001,
//             "coin": 2047,
//             "deviceId": "BF35095B-4003-4AF2-BF2E-5B2EBA6BA748",
//             "id": 100000,
//             "createdAt": "1501295689493",
//             "updatedAt": "1501295689518",
//             "headerUrl": "http://i2.tiimg.com/1949/3172b6dbfce28d2e.png"
//         }
//     }]
// };