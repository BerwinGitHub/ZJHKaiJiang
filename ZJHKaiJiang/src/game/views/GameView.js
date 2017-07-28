/**
 * Created by Berwin on 2017/7/8.
 */

var GameView = cc.View.extend({

    TAG_HEADER: 1000,// 头像的TAG

    ctor: function () {
        this._super(new GameController(this));

        var data = ccs.load(res.studio_room_layers_room_json);
        this.addChildToCenter(data.node);

        var btnBack = ccui.helper.seekNodeByName(data.node, "btn_menu");
        btnBack.addClickEventListener(() => {
            cc.app.viewmgr.replaceView(new HallView());
        });
    },

    _initTable: function () {
        var table = cc.app.player.data.table;
        if (!table)
            return;
        // seatID
    },

    addSeat: function (seatData, seatNode) {
        seatData.callCoin; // 下注的金额
        seatData.user.username; // 用户名字
        seatData.user.headerUrl;// 头像地址
        seatData.user.coin;// 用户的金币
    },

    removeSeat: function () {

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
    },

    onEnter: function () {
        this._super();
        console.log("logic onEnter");
    },

    onExit: function () {
        this._super();
        console.log("logic onExit");
    },

});