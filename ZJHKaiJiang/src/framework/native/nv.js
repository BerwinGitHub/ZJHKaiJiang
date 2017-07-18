/**
 * Created by Berwin on 2017/5/27.
 */
var nv = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this._clsName = "org/cocos2dx/javascript/NativeInterface";
        } else {
            this._clsName = "NativeInterface";
        }
        function abc() {

        }

        abc.name;
    },

    makeToast: function makeToast(content, time) {
        // TODO 处理默认参数解析的问题
        cc.callNativeStaticMethod(this._clsName, makeToast);
    },

    systemShare: function systemShare(title, content, imgUrl) {
        cc.callNativeStaticMethod(this._clsName, systemShare);
    },

    showAlertDialog: function showAlertDialog(title, content, positive, negative, callback) {
        cc.callNativeStaticMethod(this._clsName, showAlertDialog);
    },

    isNetworkAvaliable: function isNetworkAvaliable() {
        return cc.callNativeStaticMethod(this._clsName, isNetworkAvaliable);
    },

    getDeviceUUID: function getDeviceUUID() {
        return cc.callNativeStaticMethod(this._clsName, getDeviceUUID);
    },

    showPrivacyWithURL: function showPrivacyWithURL(url) {
        return cc.callNativeStaticMethod(this._clsName, showPrivacyWithURL);
    },

    showMoreGame: function showMoreGame() {
        cc.callNativeStaticMethod(this._clsName, showMoreGame);
    }
});