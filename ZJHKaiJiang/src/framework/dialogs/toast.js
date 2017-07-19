/**
 * Created by Berwin on 2017/7/19.
 */

var Toast = cc.Class.extend({

    LENGTH_LONG: 3.5,
    LENGTH_SHORT: 2,

    ctor: function () {
        // this._super();
    },

    makeToask: function (msg, duration = 2) {
        var toaster = new Toaster(msg, duration);
        return toaster;
    },


});

var Toaster = cc.Class.extend({

    HEIGHT: 45,

    _msg: null,

    _duration: 2,

    _background: null,

    ctor: function (msg, duration) {
        // bg
        this._msg = msg;
        this._duration = duration;
        this._background = new cc.LayerColor(cc.color(0, 0, 0, 180));
        this._background.setContentSize(cc.winSize.width, this.HEIGHT);
        this._background.setAnchorPoint(cc.p(0.5, 0));
        this._background.setPosition(0, cc.winSize.height);
        var rootView = cc.app.viewmgr.getRootView();
        rootView.addChildToPrompt(this._background);
        // txt
        var txt = new cc.LabelTTF(msg, null, 23);
        txt.color = cc.color.WHITE;
        txt.setDimensions(cc.winSize.width, this._background.height);
        txt.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        txt.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        txt.setPosition(this._background.width / 2, this._background.height / 2);
        this._background.addChild(txt);
    },

    show: function () {
        if (this._background) {
            this._background.runAction(cc.sequence(cc.moveBy(.2, cc.p(0, -this.HEIGHT)), cc.delayTime(this._duration), cc.moveBy(.2, cc.p(0, this.HEIGHT)), cc.removeSelf()));
        }
    },

});