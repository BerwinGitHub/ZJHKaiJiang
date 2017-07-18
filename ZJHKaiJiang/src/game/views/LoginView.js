/**
 * Created by Berwin on 2017/7/16.
 */

var LoginView = cc.View.extend({

    ctor: function () {
        this._super(new LoginController(this));
        var data = ccs.load(res.studio_login_layers_login_json);
        this.addChildToCenter(data.node);

        var btnLogin = ccui.helper.seekNodeByName(data.node, "btn_wechat");
        btnLogin.addClickEventListener(() => {
            cc.app.viewmgr.replaceView(new HallView());
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

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});

var LoginController = cc.ViewController.extend({

    ctor: function () {
        this._super();
        // 链接服务器
        cc.keySocketPipe = cc.app.sockets.connect("127.0.0.1", 8867);
    },

    login: function () {

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