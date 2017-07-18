/**
 * Created by Berwin on 2017/5/27.
 */
var facebook = cc.Class.extend({

    EVENT_FB_LOGIN_SUCCESS: "event_fb_login_success",

    _clsName: null,

    ctor: function (app) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this._clsName = "org/cocos2dx/javascript/FacebookInterface";
        } else {
            this._clsName = "FacebookInterface";
        }

        app.events.register(this.EVENT_FB_LOGIN_SUCCESS, (data) => {
            cc.app.player.facebookToken = data;
            // cc.app.log.i("FacebookToken", JSON.stringify(cc.app.player.facebookToken));
        });
    },

    login: function login(permissions) {
        cc.callNativeStaticMethod(this._clsName, login);
    },

    isLogin: function isLogin() {
        var login = cc.callNativeStaticMethod(this._clsName, isLogin);
        return login == "true";
    },

    getAccessToken: function getAccessToken() {
        var token = cc.callNativeStaticMethod(this._clsName, getAccessToken);
        return token;
    },

    invite: function invite() {
        cc.callNativeStaticMethod(this._clsName, invite);
    },

    share: function share() {
        cc.callNativeStaticMethod(this._clsName, share);
    },
});