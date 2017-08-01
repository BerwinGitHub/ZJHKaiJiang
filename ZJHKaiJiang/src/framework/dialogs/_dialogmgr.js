/**
 * Created by Berwin on 2017/5/28.
 */
var dialogmgr = cc.Class.extend({

    ctor: function () {
        this.dialogConsole = this.registerDialog(dialogconsole);
        this.diaLoading = this.registerDialog(DialogLoading);
    },

    /**
     *
     * @param dialog
     * @param parameters { touchClose:true, opacity:180, swallowTouches: true,
     * maskColor: cc.color(0, 0, 0, 255), show:function(finsih){}, hide:function(finsih){}}
     * @returns {*}
     */
    registerDialog: function (dialog, parameters = {}) {
        if (!dialog) {
            console.log("This dialog is null. Please sure this dialog is not null.");
            return;
        }
        dialog.__instance = null;
        dialog.__isHide = false;
        dialog.show = (inView = true) => {
            cc.director.getScheduler().schedule(() => {
                if (dialog.__isHide)
                    return;
                var dia = new dialog(parameters);
                var view = (inView ? cc.app.viewmgr.getRunningView() : cc.app.viewmgr.getRootView());
                view.addChildToDialog(dia);
                dia.show();
                dialog.__instance = dia;
            }, this, 0, 0, 0, false, "dialog_show_in_local");
        };
        dialog.hide = () => {
            dialog.__isHide = true;
            dialog.__instance && dialog.__instance.hide();
        };
        return dialog;
    },

});

var DialogMask = cc.Node.extend({

    /**
     * 点击关闭
     */
    _touchClose: true,

    /**
     * 透明度
     */
    _opacity: 180,

    /**
     *
     */
    _swallowTouches: true,

    /**
     * mask 的背景颜色
     */
    _maskColor: cc.color(0, 0, 0, 255),

    /**
     * 半透明背景层
     */
    _maskLayer: null,

    /**
     * 触摸监听
     */
    _listener: null,

    /**
     * 参数
     */
    _parameters: null,

    node: null,

    action: null,

    ctor: function (json, parameters = {}) {
        this._super();
        //{ touchClose:true, opacity:180, swallowTouches: true,maskColor: cc.color(0, 0, 0, 255), show:function(){}, hide:function(){}}
        this._parameters = parameters;
        parameters.touchClose && (this._touchClose = parameters.touchClose);
        parameters.opacity && (this._opacity = parameters.opacity);
        (parameters.swallowTouches != null) && (this._swallowTouches = parameters.swallowTouches);
        parameters.maskColor && (this._maskColor = parameters.maskColor);
        this._initMaskLayer();
        if (json) {
            var data = ccs.load(json);
            this.node = data.node;
            this.action = data.action;
            this.node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.node.runAction(this.action);
            this.addChild(data.node);
        }
    },

    _initMaskLayer: function () {
        this._maskLayer = new cc.LayerColor(this._maskColor);
        this._maskLayer.setOpacity(this._opacity);
        this._maskLayer.setContentSize(cc.winSize);
        this.addChild(this._maskLayer);

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: this._swallowTouches,
            onTouchBegan: (t, e) => this.onTouchBegan.apply(this, [t, e]),
            onTouchEnded: (t, e) => this.onTouchEnded.apply(this, [t, e]),
        });
        cc.eventManager.addListener(this._listener, this._maskLayer);
    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locInNode = target.convertToNodeSpace(touch.getLocation());
        var rect = cc.rect(0, 0, target.width, target.height);
        if (cc.rectContainsPoint(rect, locInNode)) {
            return true;
        }
        return false;
    },

    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        var locInNode = target.convertToNodeSpace(touch.getLocation());
        var rect = cc.rect(0, 0, target.width, target.height);
        if (cc.rectContainsPoint(rect, locInNode) && this._touchClose) {
            this.hide();
        }
    },

    show: function () {
        this._parameters.show && this._parameters.show(() => {
        });
    },

    hide: function () {
        if (this._parameters.hide) {
            this._parameters.hide(() => {
                this.removeFromParent();
            });
        } else {
            this.removeFromParent();
        }
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

});