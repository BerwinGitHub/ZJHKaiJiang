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
            this._viewController.login();
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

    onLogic: function () {
        this._super();
        cc.app.events.onNode(this._target, CSMapping.S2C.LOGIN_SUCCESS, (d) => this.loginSuccess(d));
        cc.app.events.onNode(this._target, CSMapping.S2C.LOGIN_FAILED, (d) => this.loginFailed(d));
    },

    loginSuccess: function (data) {
        cc.app.player.user = cc.app.proto.parseFromArrayString("User", data);
        cc.app.toast.makeToask(language.loginSuccess, 3).show();
        cc.app.dialogmgr.diaLoading.hide();
        cc.app.viewmgr.replaceView(new HallView());
    },

    loginFailed: function (data) {
        cc.app.player.user = null;
        cc.app.toast.makeToask(language.loginFailed, 3).show();
        cc.app.dialogmgr.diaLoading.hide();
        cc.app.viewmgr.replaceView(new HallView());
    },

    login: function () {
        if (!cc.app.viewmgr.getGameController().isNetworkAvaliable()) {
            this.loginFailed(null);
            return;
        }
        cc.app.dialogmgr.diaLoading.show();
        // 开始登录
        var user = null;
        if (cc.sys.isNative) {
            user = {deviceId: "BF35095B-4003-4AF2-BF2E-5B2EBA6BA748"};
        } else {
            user = {deviceId: "AFR5045B-4003-2AF2-BF2E-5B2EBA6BA748"};
        }
        var buffer = cc.app.proto.bytesify("User", user);
        // console.log(JSON.stringify(buffer));
        cc.app.socketmgr.emit(CSMapping.C2S.LOGIN, JSON.stringify(buffer));

        // var i = cc.app.core.randomInt(0, 10);
        // if (i < 5) {
        //     this._target.runAction(cc.sequence(cc.delayTime(5.0), cc.callFunc(() => this.loginSuccess())));
        // } else {
        //     this._target.runAction(cc.sequence(cc.delayTime(5.0), cc.callFunc(() => this.loginFailed())));
        // }
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