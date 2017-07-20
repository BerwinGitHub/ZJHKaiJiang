/**
 * Created by Berwin on 2017/4/25.
 */
var app = cc.Class.extend({

    ctor: function () {
        this.core = new core();
        this.log = new log();
        this.prototype = new prototype();
        this.configs = new configs();
        this.datas = new datas();
        this.events = new events(); // native中需要用到events
        this.native = new native(this);
        this.helper = new helper();
        this.visiblerect = new visiblerect();
        this.dialogmgr = new dialogmgr();
        this.toast = new Toast();
        this.proto = new proto();
        this.player = new player();

        this.viewmgr = ViewManager.getInstance();

        // Socket
        this.socketmgr = new SocketUtility(SOCKET_TYPE.SOCKETIO);
        this.socketmgr.connect("192.168.1.80", 8868);
        var mapping = CSMapping.S2C;
        for (var key in mapping) {
            this.socketmgr.on(mapping[key]);
        }
    },
});