/**
 * Created by Berwin on 2017/7/19.
 */

var DialogLoading = DialogMask.extend({

    ctor: function () {
        this._touchClose = false;
        this._super(res.studio_com_components_dialog_loading_json);
    },

    show: function () {
        this._super();
        this.action.play("loading", true);
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }

});