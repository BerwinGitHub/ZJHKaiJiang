/**
 * Created by Berwin on 2017/7/8.
 */

/**
 * 桌子上最多人数
 * @type {number}
 */
var TABLE_MAX_PLAYER = 7;
var BET_ITEMS = [1, 3, 5, 8, 10];

var GameView = cc.View.extend({

    TAG_HEADER: 1000,// 头像的TAG
    _seatNodes: null,
    _mySeatID: 0,// 我的位置的编号
    _seatsMapping: null,// 本地位置和服务器位置对应表
    _dealCardsNode: null,//
    _startTimeNode: null,
    _node: null,
    _checkboxAutoFollow: null,// 自动跟注
    _coinArea: null,
    _addBetPanel: null,

    ctor: function () {
        this._super(new GameController(this));
        var data = ccs.load(res.studio_room_layers_room_json);
        this.addChildToCenter(data.node);
        this._node = data.node;
        this._dealCardsNode = ccui.helper.seekNodeByName(data.node, "dealCards");
        this._startTimeNode = ccui.helper.seekNodeByName(data.node, "lbl_start");
        this._checkboxAutoFollow = ccui.helper.seekNodeByName(data.node, "cb_follow");
        this._coinArea = ccui.helper.seekNodeByName(data.node, "coin_area");
        this._addBetPanel = ccui.helper.seekNodeByName(data.node, "addBetPanel");
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
            (function (btn, i, self) {
                btn.addClickEventListener((data) => functions[i].apply(self, [data]));
            })(btn, i, this);
        }
        this.lockButtons(true);
        // 点击加注背景隐藏
        var addBetMask = ccui.helper.seekNodeByName(node, "add_bet_mask");
        addBetMask.addClickEventListener(() => {
            this._addBetPanel.setVisible(false);
        });
        for (var i = 0; i < 5; i++) {
            var chip = ccui.helper.seekNodeByName(node, "chip_" + i);
            (function (chip, i, self) {
                chip.addClickEventListener((data) => self._gameAddItem.apply(self, [data]));
            })(chip, i, this);
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
        this._viewController.toServerPrepare();
        btn.visible = false;
    },

    /**
     * 比牌
     * @private
     */
    _gameCompare: function (btn) {
        this.lockButtons(false); // 锁住按钮
        // 选择比较的用户
        var comparedSeatID = 1;
        this._viewController.toServerCompare(comparedSeatID);
    },

    /**
     * 看牌
     * @private
     */
    _gameWatch: function (btn) {
        this.lockButtons(false); // 锁住按钮
        this._viewController.toServerWatch();
    },

    /**
     * 加注
     * @private
     */
    _gameAdd: function (btn) {
        // TODO 设置隐藏和显示
        var betLevelValue = this._viewController._currentBet / this._viewController._minBet;
        for (var i = 0; i < BET_ITEMS.length; i++) {
            var chipBtn = ccui.helper.seekNodeByName(this._node, "chip_" + i);
            chipBtn && chipBtn.setTouchEnabled(BET_ITEMS[i] > betLevelValue);
            chipBtn && chipBtn.setBright(BET_ITEMS[i] > betLevelValue);
        }
        this._addBetPanel.setVisible(true);
    },

    _gameAddItem: function (btn) {
        var data = cc.app.helper.ui.getWidgetUserData(btn);
        var idx = parseInt(data);
        var coin = this._viewController._minBet * BET_ITEMS[idx];
        this._addBetPanel.setVisible(false);
        this._viewController.toServerAddBet(coin);
        this.lockButtons(false); // 锁住按钮
    },

    /**
     * 跟到底
     * @private
     */
    _gameFollowAlways: function () {
        this._checkboxAutoFollow.setSelected(!this._checkboxAutoFollow.isSelected());
    },

    /**
     * 跟注
     * @private
     */
    _gameFollow: function () {
        this.lockButtons(false); // 锁住按钮
        this._viewController.toServerFollow();
    },

    /**
     * 弃牌
     * @private
     */
    _gameGiveup: function () {
        this.lockButtons(false); // 锁住按钮
        this._viewController.toServerGiveup();
    },

    /**
     * 是否是自动加注
     * @returns {*|boolean|bool|Boolean}
     */
    isAutoFollow: function () {
        return this._checkboxAutoFollow.isSelected();
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

    /**
     * 开始倒计时
     * @param seatID
     * @param dt
     * @param finish
     */
    somebodyCountDown: function (seatID, dt, finish) {
        var seatNode = this._getSeatNodeBySeatID(seatID);
        var progress = ccui.helper.seekNodeByName(seatNode, "count_down").getChildren()[0];
        progress.color = cc.color.GREEN;
        var spawn = cc.spawn(cc.progressFromTo(dt, 0, 100), cc.tintTo(dt, 255, 0, 0));
        progress.runAction(cc.sequence(spawn, cc.callFunc(() => {
            finish && finish(seatNode);
            progress.setPercentage(0);
            progress.color = cc.color.GREEN;
        })));
    },

    resetCountDown: function (seatID) {
        var seatNode = this._getSeatNodeBySeatID(seatID);
        var progress = ccui.helper.seekNodeByName(seatNode, "count_down").getChildren()[0];
        progress.stopAllActions();
        progress.setPercentage(0);
        progress.color = cc.color.GREEN;
    },

    /**
     * 某个用户放弃
     * @param seatID
     */
    somebodyGiveup: function (seatID) {
        // 设置成弃牌的状态
        this._setCardCoverFrame(seatID, "studio/room/images/cards/game_poker2.png");
    },

    /**
     * 某人看牌了
     * @param seatID
     */
    somebodyWatch: function (seatID) {
        var seatNode = this._getSeatNodeBySeatID(seatID);
        // 设置成弃牌的状态
        for (var i = 0; i < 3; i++) {
            var cardNode = ccui.helper.seekNodeByName(seatNode, "poker_" + i);
            cardNode.setRotation(i * 5);
        }
    },

    /**
     * 某人加注
     * @param seatData
     */
    somebodyAddBet: function (seatData, addBet) {
        var seatNode = this._getSeatNodeBySeatID(seatData.seatID);
        var lblCoin = ccui.helper.seekNodeByName(seatNode, "use_coin");
        lblCoin.string = seatData.callCoin;
        this._addChipToTable(seatData.seatID, addBet);
    },

    /**
     * 某人跟注
     * @param seatID
     */
    somebodyFollowBet: function (seatData, bet) {
        var seatNode = this._getSeatNodeBySeatID(seatData.seatID);
        var lblCoin = ccui.helper.seekNodeByName(seatNode, "use_coin");
        lblCoin.string = seatData.callCoin;
        this._addChipToTable(seatData.seatID, bet);
    },

    /**
     * 比牌
     * @param seatID
     * @param otherSeatID
     * @param winnerSeatID
     */
    somebodyCompare: function (seatID, otherSeatID, winnerSeatID) {
        // 1.播放比较动画
        var sn1 = this._getSeatNodeBySeatID(seatID);
        var sn2 = this._getSeatNodeBySeatID(otherSeatID);
        var needShowCard = (seatID == this._mySeatID || otherSeatID == this._mySeatID);
        this._setCardCoverVisible(seatID, !needShowCard);
        this._setCardCoverVisible(otherSeatID, !needShowCard);
        // 2.比牌失败就换cover
        this._setCardCoverFrame(seatID == winnerSeatID ? otherSeatID : seatID, "studio/room/images/cards/game_poker3.png");
    },

    /**
     * 设置牌的cover是否显示
     * @param seatID
     * @param visible
     * @private
     */
    _setCardCoverVisible: function (seatID, visible) {
        var seatNode = this._getSeatNodeBySeatID(seatID);
        // 设置成弃牌的状态
        for (var i = 0; i < 3; i++) {
            var cardNode = ccui.helper.seekNodeByName(seatNode, "poker_" + i);
            var cover = ccui.helper.seekNodeByName(cardNode, "cover");
            cover.visible = visible;
        }
    },

    /**
     * 设置cover的状态(正常/看牌/比牌输)
     * @param seatID
     * @param frame
     * @private
     */
    _setCardCoverFrame: function (seatID, frameUrl) {
        var seatNode = this._getSeatNodeBySeatID(seatID);
        // 设置成弃牌的状态
        for (var i = 0; i < 3; i++) {
            var cardNode = ccui.helper.seekNodeByName(seatNode, "poker_" + i);
            var cover = ccui.helper.seekNodeByName(cardNode, "cover");
            cover.setSpriteFrame(frameUrl);
        }
    },

    _addChipToTable: function (seatID, coin) {
        var seatNode = this._getSeatNodeBySeatID(seatID);
        var worldPos = seatNode.getParent().convertToWorldSpace(seatNode.getPosition());
        var parentPos = this._coinArea.convertToNodeSpace(worldPos);
        var targetPos = cc.p(app.core.randomInt(0, this._coinArea.width), app.core.randomInt(0, this._coinArea.height));
        var chip = new cc.Sprite("#studio/room/images/chips/chip" + this._viewController._minBet + "_" + coin + ".png");
        if (!chip)
            return;
        chip.setPosition(parentPos);
        this._coinArea.addChild(chip);
        chip.runAction(cc.moveTo(0.35, targetPos));
    },


    _updateTable: function () {
        var table = cc.app.player.data.table;
        if (!table)
            return;
        var tableID = table.tableID ? table.tableID : 0;
        this._viewController._minBet = table.minBet;
        this._viewController._currentBet = table.currentBet;
        // 设置房间信息
        var lblInfo = ccui.helper.seekNodeByName(this._node, "rule_txt");
        lblInfo.string = "普通房--第" + tableID + "桌     单注:" + this._viewController._minBet + "     封顶:" + this._viewController._minBet * 10;
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

    lockButtons: function (isAllButtons = false) {
        var keyNames = isAllButtons ? ["btn_follow", "btn_giveup", "btn_compare", "btn_watch", "btn_add", "btn_follow_always"] : ["btn_follow", "btn_compare", "btn_add"];
        for (var i = 0; i < keyNames.length; i++) {
            var btn = ccui.helper.seekNodeByName(this._node, keyNames[i]);
            btn && btn.setTouchEnabled(false);
            btn && btn.setBright(false);
            btn && (btn.titleColor = cc.hexToColor("#4D4D4D"));
        }
    },

    unlockButtons: function (isAllButtons = true) {
        var keyNames = isAllButtons ? ["btn_follow", "btn_giveup", "btn_compare", "btn_watch", "btn_add", "btn_follow_always"] : ["btn_follow", "btn_compare", "btn_add"];
        for (var i = 0; i < keyNames.length; i++) {
            var btn = ccui.helper.seekNodeByName(this._node, keyNames[i]);
            btn && btn.setTouchEnabled(true);
            btn && btn.setBright(true);
            btn && (btn.titleColor = cc.hexToColor("#005400"));
        }
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});

var GameController = cc.ViewController.extend({

    _seatEntities: null, // 作为的实体(数据)
    _preparedSeat: null, // 准备的座位
    _currentBet: 0, // 当前倍率
    _minBet: 0,// 最小倍率

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
        this._currentBet = go.currentBet; // 当前的倍率
        var seatID = go.seatID ? go.seatID : 0;
        switch (go.action) {
            case $root.GameAction.PREPARE: // 用户准备
                this._target.lockButtons(true);
                var seat = this._seatEntities[seatID];
                seat.isPrepared = true;
                this._preparedSeat[seat.seatID] = seat;
                this._target.updateSeat(seat); // 更新位置
                break;
            case $root.GameAction.COUNTDOWN_START: // 倒计时开始
                this._target.startCountDown(go.millis.toNumber());
                break;
            case $root.GameAction.SEND_CARD: // 发牌
                this._target.dealCard(seatID);
                this._target.lockButtons(false);
                break;
            case $root.GameAction.TURN: // 该自己操作
                if (seatID == this._target._mySeatID) { // 该我操作
                    if (this._target.isAutoFollow()) {
                        this.toServerFollow();
                    } else {
                        this._target.unlockButtons();
                    }
                } else { // 到其他人操作
                    this._target.lockButtons();
                }
                this._target.somebodyCountDown(seatID, (go.millis.toNumber() - Date.now()) / 1000.0, null);
                break;
            case $root.GameAction.ADDBET: // 加注
                var seatData = this.getSeatEntity(seatID);
                seatData.callCoin += go.coin;
                this._target.somebodyAddBet(seatData, go.coin);
                this._target.resetCountDown(seatID); // 清空倒计时
                break;
            case $root.GameAction.FOLLOW: // 跟注
                var seatData = this.getSeatEntity(seatID);
                seatData.callCoin += go.coin;
                this._target.somebodyFollowBet(seatData, go.coin);
                this._target.resetCountDown(seatID); // 清空倒计时
                break;
            case $root.GameAction.WATCH: // 看牌
                this._target.somebodyWatch(seatID);
                this._target.resetCountDown(seatID); // 清空倒计时
                break;
            case $root.GameAction.GIVEUP: // 弃牌
                this._target.somebodyGiveup(seatID);
                this._target.resetCountDown(seatID); // 清空倒计时
                break;
            case $root.GameAction.COMPARE: // 比牌
                var placementSeatID = go.placementSeatID ? go.placementSeatID : 0;
                var winnerSeatID = go.winnerSeatID ? go.winnerSeatID : 0;
                this._target.somebodyCompare(seatID, placementSeatID, winnerSeatID);
                this._target.resetCountDown(seatID); // 清空倒计时
                break;
            case $root.GameAction.END: // 结束
                this._preparedSeat = null;
                this._target.lockButtons(true);
                break;
            default:
                break;
        }
    },

    /**
     * 告诉服务器准备了
     */
    toServerPrepare: function () {
        var data = {action: $root.GameAction.PREPARE, seatID: this._target._mySeatID};
        cc.app.socketmgr.emit(CSMapping.C2S.GAMEING, this._buildGameOperateProto(data));
    },

    /**
     * 告诉服务器跟注
     * @param coin
     */
    toServerFollow: function () {
        var data = {action: $root.GameAction.FOLLOW, coin: this._currentBet, seatID: this._target._mySeatID};
        cc.app.socketmgr.emit(CSMapping.C2S.GAMEING, this._buildGameOperateProto(data));
    },

    /**
     * 告诉服务器加注
     * @param coin
     */
    toServerAddBet: function (coin) {
        var data = {action: $root.GameAction.ADDBET, coin: coin, seatID: this._target._mySeatID};
        cc.app.socketmgr.emit(CSMapping.C2S.GAMEING, this._buildGameOperateProto(data));
    },

    /**
     * 告诉服务器看牌
     */
    toServerWatch: function () {
        var data = {action: $root.GameAction.WATCH, seatID: this._target._mySeatID};
        cc.app.socketmgr.emit(CSMapping.C2S.GAMEING, this._buildGameOperateProto(data));
    },

    /**
     * 告诉服务器比牌
     * @param otherSeatID
     */
    toServerCompare: function (otherSeatID) {
        var data = {action: $root.GameAction.COMPARE, seatID: this._target._mySeatID, placementSeatID: otherSeatID};
        cc.app.socketmgr.emit(CSMapping.C2S.GAMEING, this._buildGameOperateProto(data));
    },

    /**
     * 告诉服务器弃牌
     */
    toServerGiveup: function () {
        var data = {action: $root.GameAction.GIVEUP, seatID: this._target._mySeatID};
        cc.app.socketmgr.emit(CSMapping.C2S.GAMEING, this._buildGameOperateProto(data));
    },

    _buildGameOperateProto: function (data) {
        var buffer = app.proto.bytesify($root.GameOperate, data);
        return JSON.stringify(buffer);
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

    getSeatEntity: function (seatID) {
        return this._seatEntities[seatID];
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