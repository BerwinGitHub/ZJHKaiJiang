/**
 * Created by Berwin on 2017/7/8.
 */

var HomeView = cc.View.extend({

    _keyChannel: null,

    ctor: function () {
        this._super();
        this.bg = new cc.LayerColor(cc.mjoys.color.background);
        this.bg.setContentSize(cc.visibleSize);
        this.addChild(this.bg);

        // SocketHelper.getInstance().setUpEnvironment("127.0.0.1", "8867");
        // var data = ccs.load(res.studio_HomeScene_node_HomeScene_json);
        // this.addChild(data.node);
        //
        // var btn = cc.app.helper.ui.findNodeByName(data.node, "Button_1");
        // btn.addClickEventListener(this.onHallClick);
        //
        // this.nodeAmt = cc.app.helper.ui.findNodeByName(data.node, "amtNode");
        // this.nodeAmt.action.play("ani", true);
        //
        // cc.app.dialogmgr.dialogconsole.showWithGlobal();

        //
        var dot = this._createDot();
        dot.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(dot);

        // console.log("Start Connect Server.");
        // this.testProto();
        // cc.SocketUtility.getInstance().connectWithCallback("127.0.0.1", 8868, () => {
        // });
        // this._keyChannel = cc.app.socketUtility.connect("127.0.0.1", 8868);
        // this._keyChannel = cc.app.socketUtility.connect("192.168.1.80", 8868);

        var socket = new SocketIoPipe("127.0.0.1", 8867);
        // var socket = new SocketIoPipe("192.168.1.80", 8867);
        socket.connect();

        var button = ccui.Button.create("res/images/content/circle_bg.png");
        button.addClickEventListener(() => { // 登录
            var user = {userId: 1, userName: "Berwin", passWord: "123456", score: 0};
            var buffer = cc.app.proto.encode(app.proto.ACTION_MAPPING.ACTION_LOGIN.code, {user: user});
            app.log.i(buffer);
            // socket.send(buffer);
            socket.emit("login", JSON.stringify(buffer));
            // app.socketUtility.send(this._keyChannel, buffer);
        });
        button.setPosition(cc.p(200, 400));
        this.addChild(button);
        var button = ccui.Button.create("res/images/content/circle_bg.png");
        button.addClickEventListener(() => { // 开始匹配

        });
        button.setPosition(cc.p(200, 200));
        this.addChild(button);

        // this.testProto();
    },

    _receive: function (key, data) {
        console.log("key:" + JSON.stringify(key));
        console.log("data:" + JSON.stringify(data));
    },

    _createDot: function () {
        var circleBg = new cc.Sprite("res/images/content/circle_bg.png");

        var circle = new cc.Sprite("res/images/content/circle_t" + cc.app.core.randomInt(0, 6) + ".png");
        circleBg.addChildToCenter(circle);


        var seq = cc.sequence(cc.delayTime(5.0), cc.callFunc(() => {
            var texture = cc.textureCache.addImage("res/images/content/circle_t" + cc.app.core.randomInt(0, 6) + ".png");
            circle.setTexture(texture);
        }));
        circle.runAction(seq.repeatForever());

        return circleBg;
    },

    onHallClick: function (data) {
        var user = {userId: 1, userName: ""};
        var buffer = cc.app.proto.encode("Login", {u: user});
        cc.app.log.i("Tag", "Buffer:" + buffer);
        var msg = cc.app.proto.decode(buffer);
        console.log(msg);
        cc.app.log.i("Tag", "msg:" + JSON.stringify(msg));
    },

    testProto: function () {
        var user = {userId: 1, userName: "Berwin", passWord: "123456", score: 0};
        var buffer = cc.app.proto.encode(app.proto.ACTION_MAPPING.ACTION_LOGIN.code, {user: user});
        cc.app.log.i("proto", "Buffer:" + buffer);
        var msg = cc.app.proto.decode(buffer);
        console.log(msg);
        cc.app.log.i("proto", "msg:" + JSON.stringify(msg));
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

    },
});