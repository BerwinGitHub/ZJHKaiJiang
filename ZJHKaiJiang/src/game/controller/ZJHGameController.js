/**
 * Created by Berwin on 2017/7/25.
 */

var ZJHGameController = GameController.extend({

    _networkAvailable: false,

    ctor: function () {
        this._super();
    },

    onStarted: function () {
        // 链接网络
        cc.app.events.onNode(this, "connect", (d) => this.netConnect(d));
        cc.app.events.onNode(this, "disconnect", (d) => this.netDisConnect(d));
        cc.app.events.onNode(this, "error", (d) => this.netError(d));
        cc.app.socketmgr.connect("192.168.1.80", 8868);
        // cc.app.socketmgr.connect("192.168.0.209", 8868);
        // 注册所有mapping事件,在界面上注册接收即可
        var mapping = CSMapping.S2C;
        for (var key in mapping) {
            cc.app.socketmgr.on(mapping[key]);
        }

    },

    netConnect: function () {
        this._networkAvailable = true;
        cc.app.toast.makeToask(language.netConnect, 3).show();
    },

    netDisConnect: function () {
        this._networkAvailable = false;
        cc.app.toast.makeToask(language.netDisconnect, 3).show();
    },

    netError: function () {
        this._networkAvailable = false;
        cc.app.toast.makeToask(language.netError, 3).show();
    },

    isNetworkAvaliable: function () {
        return this._networkAvailable;
    },

    onApplicationDidEnterBackground: function () {

    },

    onApplicationWillEnterForeground: function () {

    },

    onReplaceView: function (lastView, nowView) {

    },

    onPushView: function (lastView, nowView) {

    },

    onPopView: function (nowView) {

    },

    onEnded: function () {

    },

});
