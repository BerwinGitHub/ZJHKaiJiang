/**
 * Created by Berwin on 2017/7/25.
 */
var GameController = cc.Node.extend({

    ctor: function () {
        this._super();
        // 处理后台进入
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, () => this.onApplicationDidEnterBackground());
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, () => this.onApplicationWillEnterForeground());
    },

    onStarted: function () {

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

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },

});