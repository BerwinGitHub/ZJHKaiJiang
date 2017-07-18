/**
 * Created by Berwin on 2017/7/8.
 */

var SocketIO = SocketIO || io;

/**
 * 一个Socket通道
 * @type {Function}
 */
var SocketIoPipe = cc.Class.extend({

    _host: null,
    _port: null,
    _socket: null,
    _recevier: null,

    ctor: function (host, port) {
        this._host = host;
        this._port = port;
        this._recevier = [];
    },

    connect: function () {
        // SocketIO
        this._socket = SocketIO.connect("http://" + this._host + ":" + this._port + "/");
        this._socket.tag = this.getSocketPipeKey();

        // 注册事件，通过广播的方式发出去
        this.on("connect");
        this.on("message");
        this.on("disconnect");
        this.on("error");
    },

    send: function (data) {
        if (this._socket) {
            this._socket.send(data);
        }
    },

    emit: function (eventName, data) {
        if (this._socket) {
            // this._socket.emit("eventName", "{\"message\":\"Hello Server.\"}");
            this._socket.emit(eventName, data);
        }
    },

    on: function (eventName) {
        if (this._socket) {
            (function (self, eventName) {
                self._socket.on(eventName, (data) => {
                    cc.app.events.emit(eventName, data);
                });
            })(this, eventName);
        }
    },

    close: function () {
        if (this._socket) {
            console.log("[WebSocket]-Close");
            this._socket.close();
            this._socket = null;
        }
    },

    getSocketPipeKey: function () {
        return this._host + "-" + this._port;
    },

});