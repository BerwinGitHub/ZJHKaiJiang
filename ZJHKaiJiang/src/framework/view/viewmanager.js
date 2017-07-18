/**
 * Created by Berwin on 2017/7/8.
 */

var ViewManager = {

    /**
     * 游戏唯一的界面
     */
    _gameScene: null,

    /**
     * 游戏的根View
     */
    _rootView: null,

    /**
     * 界面的堆栈
     */
    _viewStack: null,

    runWithView: function (view) {
        if (!this._gameScene) {
            this._viewStack = [];
            this._gameScene = new GameScene();
            this._rootView = this._gameScene.getRootView();
            cc.director.runScene(this._gameScene);
        }
        this._rootView.addChild(view);
        this._viewStack.push(view);
    },

    /**
     * 替换新的view
     * @param view  将要展现的view
     * @param previousViewAction    上个界面移除时的动画
     */
    replaceView: function (view, previousViewAction = null) {
        this._rootView.addChild(view);
        this.popView(previousViewAction); // 弹出上个界面
        this._viewStack.push(view);
    },

    /**
     *
     * @param view  新的界面
     * @param previousViewAction 上个界面需要展示的动画
     */
    pushView: function (view, previousViewAction = null) {
        this._rootView.addChild(view);
        this._viewStack.push(view);
        var previousView = this._viewStack[this._viewStack.length - 1];
        previousViewAction && previousView && previousView.runAction(previousViewAction);
    },

    /**
     *
     * @param viewAction    将要弹出界面的动画
     */
    popView: function (viewAction = null) {
        var previousView = this._viewStack.pop();
        var action = viewAction ? cc.sequence(viewAction, cc.removeSelf()) : cc.removeSelf();
        previousView && previousView.runAction(action);
    },

    getRunningView: function () {
        return this._viewStack[this._viewStack.length - 1];
    },

    getGameScene: function () {
        return this._gameScene;
    },

    getRootView: function () {
        return this._rootView;
    },

    getViewStack: function () {
        this._viewStack;
    },

    getInstance: function () {
        return ViewManager;
    }
};