/**
 * Created by Berwin on 2017/7/8.
 */

var RootView = cc.View.extend({

    ctor: function () {
        this._super();
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

});

var GameScene = cc.Scene.extend({
    /**
     * 根节点
     */
    _rootView: null,

    ctor: function () {
        this._super();
        this._rootView = new RootView();
        this.addChild(this._rootView);
    },

    onEnter: function () {
        this._super();
    },

    getRootView: function () {
        return this._rootView;
    },
});