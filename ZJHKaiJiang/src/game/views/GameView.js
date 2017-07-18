/**
 * Created by Berwin on 2017/7/8.
 */

var GameView = cc.View.extend({

    ctor: function () {
        this._super();

        var data = ccs.load(res.studio_room_layers_room_json);
        this.addChildToCenter(data.node);

        var btnBack = ccui.helper.seekNodeByName(data.node, "btn_menu");
        btnBack.addClickEventListener(() => {
            cc.app.viewmgr.replaceView(new HallView());
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});