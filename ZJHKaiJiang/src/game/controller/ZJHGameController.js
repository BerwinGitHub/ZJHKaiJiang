/**
 * Created by Berwin on 2017/7/25.
 */

var ZJHGameController = GameController.extend({

    ctor: function () {
        this._super();
    },

    onStarted: function () {
        // 链接网络
        cc.app.socketmgr.connect("192.168.1.80", 8868);
        // 注册所有mapping事件
        var mapping = CSMapping.S2C;
        for (var key in mapping) {
            cc.app.socketmgr.on(mapping[key]);
        }

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
