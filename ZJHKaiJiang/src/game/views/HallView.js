/**
 * Created by Berwin on 2017/7/16.
 */

var HallView = cc.View.extend({

    ctor: function () {
        this._super();
        var data = ccs.load(res.studio_hall_layers_hall_json);
        this.addChildToCenter(data.node);
        this._initUserInfo(data.node);

        var listView = ccui.helper.seekNodeByName(data.node, "listView");
        listView.addClickEventListener((data, index) => {
            console.log(data);
            console.log(index);
            cc.app.viewmgr.replaceView(new GameView());
        });

        var btnSetting = ccui.helper.seekNodeByName(data.node, "btn_settings");
        btnSetting.addClickEventListener(() => {
            cc.app.viewmgr.replaceView(new LoginView());
        });


        // SocketHelper.getInstance().setUpEnvironment("127.0.0.1", "8867");
        // var data = ccs.load(res.studio_HomeScene_node_HomeScene_json);
        // this.addChild(data.node);
        //
        // var btn = cc.app.helper.ui.findNodeByName(data.node, "Button_1");
        // btn.addClickEventListener(this.onHallClick);
        //
        // this.nodeAmt = cc.app.helper.ui.findNodeByName(data.node, "amtNode");
        // this.nodeAmt.action.play("ani", true);
        //
        // cc.app.dialogmgr.dialogconsole.showWithGlobal();

    },

    _initUserInfo: function (node) {
        //
        var name = ccui.helper.seekNodeByName(node, "user_name");
        name.string = cc.app.player.user.username;
        // id
        var id = ccui.helper.seekNodeByName(node, "user_id");
        id.string = cc.app.player.user.id;
        // coin
        var coin = ccui.helper.seekNodeByName(node, "txt_coin");
        coin.string = cc.app.player.user.coin;
        // id
        var diamond = ccui.helper.seekNodeByName(node, "txt_diamond");
        diamond.string = cc.app.player.user.diamond;
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});