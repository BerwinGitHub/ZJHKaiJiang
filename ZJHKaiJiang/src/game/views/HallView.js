/**
 * Created by Berwin on 2017/7/16.
 */

var HallView = cc.View.extend({

    ctor: function () {
        this._super(new HallController(this));
        var data = ccs.load(res.studio_hall_layers_hall_json);
        this.addChildToCenter(data.node);
        this._initUserInfo(data.node);

        var item = ccui.helper.seekNodeByName(data.node, "item_0");
        item.addClickEventListener(() => {
            this._viewController.quickStart();
        });

        var item = ccui.helper.seekNodeByName(data.node, "item_2");
        item.addClickEventListener(() => {
            this._viewController.joinRoom();
        });

        var item = ccui.helper.seekNodeByName(data.node, "item_3");
        item.addClickEventListener(() => {
            this._viewController.createRoom();
        });

        var btnSetting = ccui.helper.seekNodeByName(data.node, "btn_settings");
        btnSetting.addClickEventListener(() => {
            cc.app.viewmgr.replaceView(new LoginView());
        });
    },

    _initUserInfo: function (node) {
        if (!cc.app.player.user)
            return;
        //
        var name = ccui.helper.seekNodeByName(node, "user_name");
        name.string = cc.app.player.user.username;
        // id
        var id = ccui.helper.seekNodeByName(node, "user_id");
        id.string = cc.app.player.user.id;
        // coin
        var coin = ccui.helper.seekNodeByName(node, "txt_coin");
        coin.string = cc.app.player.user.coin;
        // id
        var diamond = ccui.helper.seekNodeByName(node, "txt_diamond");
        diamond.string = cc.app.player.user.diamond;
        // header
        var header = ccui.helper.seekNodeByName(node, "user_header");
        var headerBorder = ccui.helper.seekNodeByName(node, "user_header_border");
        headerBorder.setLocalZOrder(100);
        var clip = new cc.Sprite("#studio/com/images/ui/user_face_mask_96.png");
        var faceClip = new cc.ClippingNode(clip);
        faceClip.setAlphaThreshold(0.01);
        var face = new HttpSprite(cc.app.player.user.headerUrl);
        if (face) {
            face.setLocalZOrder(0);
            faceClip.addChildToCenter(face);
        }
        header.addChildToCenter(faceClip);
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});

var HallController = cc.ViewController.extend({

    onLogic: function () {
        this._super();
        cc.app.events.onNode(this._target, CSMapping.S2C.ENTER_TABLE_SUCCESS, this.enterSuccess);
        cc.app.events.onNode(this._target, CSMapping.S2C.ENTER_TABLE_FAILED, this.enterFailed);
    },

    enterSuccess: function (data) {
        var table = cc.app.proto.parseFromArrayString($root.Table, data);
        cc.app.player.data.table = table;
        cc.app.dialogmgr.diaLoading.hide();
        cc.gameView = new GameView();
        cc.app.viewmgr.replaceView(cc.gameView);
    },

    enterFailed: function () {
        cc.app.dialogmgr.diaLoading.hide();
        cc.app.toast.makeToask(language.enterRoomErr, 3).show();

    },

    quickStart: function () {
        cc.app.dialogmgr.diaLoading.show();
        cc.app.socketmgr.emit(CSMapping.C2S.QUICK_START, null);
    },

    joinRoom: function () {

    },

    createRoom: function () {

    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

});