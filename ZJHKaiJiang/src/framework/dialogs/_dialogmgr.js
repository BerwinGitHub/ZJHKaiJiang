/**
 * Created by Berwin on 2017/5/28.
 */
var dialogmgr = cc.Class.extend({

    ctor: function () {
        this.dialogconsole = this.registerDialog(dialogconsole);
    },

    registerDialog: function (dialog) {
        if (!dialog) {
            console.log("This dialog is null. Please sure this dialog is not null.");
            return;
        }
        dialog.showWithLocal = () => {
            cc.director.getScheduler().schedule(() => {
                var dia = new dialog();
                var view = cc.app.viewmgr.getRunningView();
                view.addChildToDialog(dia);
                dia.show();
            }, this, 0, 0, 0, false, "dialog_show_in_local");
        };
        dialog.showWithGlobal = () => {
            cc.director.getScheduler().schedule(() => {
                var dia = new dialog();
                var view = cc.app.viewmgr.getRootView();
                view.addChild(dia);
                dia.show();
            }, this, 0, 0, 0, false, "dialog_show_in_global");
        };
        // dialog.showWithCreate = () => {//callback, target, interval, repeat, delay, paused, key
        //     cc.director.getScheduler().schedule(() => {
        //         var dia = new dialog();
        //         var scene = cc.director.getRunningScene();
        //         scene.addChild(dia);
        //         dia.show();
        //     }, this, 0, 0, 0, false, "dialog_show_in_scene");
        // };
        return dialog;
    },

});

var Dialog = cc.Node.extend({

    node: null,
    action: null,

    ctor: function (json) {
        this._super();
        var data = ccs.load(json);
        this.node = data.node;
        this.action = data.action;
        this.addChild(data.node);
    },

    show: function () {
        this.action.setLastFrameCallFunc(() => {
            console.log("Dialog enter finished.");
        });
        this.action.play("enter", false);
    },

    hide: function () {
        this.action.setLastFrameCallFunc(() => {
            console.log("Dialog exit finished.");
            this.removeFromParent();
        });
        this.action.play("exit", false);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

});