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
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },

    testGL: function () {
        var n = [];
        var x = 0, y = 0, w = 195, h = 275, space = 5;
        for (y = 0; y + h < cc.winSize.height; y += h + space) {
            for (x = 0; x + w < cc.winSize.width; x += w + space) {
                var spr = new cc.Sprite("res/HelloWorld.png");
                spr.setAnchorPoint(cc.p(0, 0));
                spr.setPosition(x, y);
                this.addChild(spr);
                n.push(spr);
            }
        }
        console.log("0 start.");
        cc.Filter.grayScale(n[0]);
        console.log("1 start.");
        cc.Filter.sepia(n[1], 0.8);
        console.log("2 start.");
        cc.Filter.wave(n[2]);
        console.log("3 start.");
        cc.Filter.blur(n[3], cc.p(80, 80));
        console.log("4 start.");
        cc.Filter.motionBlur(n[4], 15, 0.0625, cc.p(0, -0.01));
        console.log("5 start.");
        cc.Filter.motionBlur(n[5], 15, 0.0625, cc.p(-0.01, 0));
        console.log("6 start.");
        cc.Filter.shedBlur(n[6], cc.p(0.5, 0.5), 1.0 / h, 50.0);
    },
});

var LoginController = cc.ViewController.extend({

    onLogic: function () {
        this._super();
        cc.app.events.onNode(this._target, CSMapping.S2C.LOGIN_SUCCESS, (d) => this.loginSuccess(d));
        cc.app.events.onNode(this._target, CSMapping.S2C.LOGIN_FAILED, (d) => this.loginFailed(d));
    },

    loginSuccess: function (data) {
        cc.app.player.user = cc.app.proto.parseFromArrayString($root.User, data);
        cc.app.toast.makeToask(language.loginSuccess, 3).show();
        cc.app.dialogmgr.diaLoading.hide();
        cc.app.viewmgr.replaceView(new HallView());
    },

    loginFailed: function (data) {
        cc.app.player.user = null;
        cc.app.toast.makeToask(language.loginFailed, 3).show();
        cc.app.dialogmgr.diaLoading.hide();
        // cc.app.viewmgr.replaceView(new HallView());
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
        var buffer = cc.app.proto.bytesify($root.User, user);
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
    },

    onExit: function () {
        this._super();
    },

});