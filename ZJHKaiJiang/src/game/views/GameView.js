/**
 * Created by Berwin on 2017/7/8.
 */

var GameView = cc.View.extend({

    TAG_HEADER: 1000,// 头像的TAG
    seatNodes: null,
    _mySeatID: 0,// 我的位置的编号
    _seatsMapping: null,// 本地位置和服务器位置对应表

    ctor: function () {
        this._super(new GameController(this));
        var data = ccs.load(res.studio_room_layers_room_json);
        this.addChildToCenter(data.node);
        this._seatsMapping = [0, 1, 2, 3, 4, 5, 6];
        // 隐藏掉所有的位置
        this.seatNodes = [];
        for (var i = 0; i < 7; i++) {
            var seat = ccui.helper.seekNodeByName(data.node, "seat_" + i);
            seat.visible = (i == 0);
            this.seatNodes.push(seat);
        }
        this._updateTable();

        var btnBack = ccui.helper.seekNodeByName(data.node, "btn_menu");
        btnBack.addClickEventListener(() => {
            cc.app.socketmgr.emit(CSMapping.C2S.EXIT_ROOM, null);
            cc.app.viewmgr.replaceView(new HallView());
        });
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
            this.addSeat(seat);
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
        return this.seatNodes[this._seatsMapping[seatID]];
    },

    addSeat: function (seatData) {
        var seatID = seatData.seatID ? seatData.seatID : 0;
        var ccoin = seatData.callCoin ? seatData.callCoin : 0; // 下注的金额
        // node
        var seatNode = this._getSeatNodeBySeatID(seatID);
        var nCallCoin = ccui.helper.seekNodeByName(seatNode, "use_coin");
        var nName = ccui.helper.seekNodeByName(seatNode, "user_name");
        var nCoin = ccui.helper.seekNodeByName(seatNode, "user_coin");
        //
        nCallCoin.string = ccoin;
        nName.string = seatData.user.username;
        nCoin.string = seatData.user.coin;// 用户的金币
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

    onLogic: function () {
        this._super();
        cc.app.events.onNode(this._target, CSMapping.S2C.USER_ENTER_TABLE, (d) => this.userEneterTable(d));
        cc.app.events.onNode(this._target, CSMapping.S2C.USER_EXIT_TABLE, (d) => this.userExitTable(d));
    },

    userEneterTable: function (data) {
        var seat = cc.app.proto.parseFromArrayString($root.Seat, data);
        this._target.addSeat(seat);
    },

    userExitTable: function (data) {
        var seat = cc.app.proto.parseFromArrayString($root.Seat, data);
        this._target.removeSeat(seat);

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