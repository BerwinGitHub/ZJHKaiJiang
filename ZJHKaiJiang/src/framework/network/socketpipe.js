/**
 * Created by Berwin on 2017/7/8.
 */

var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

/**
 * 一个Socket通道
 * @type {Function}
 */
var SocketPipe = cc.Class.extend({

    _host: null,
    _port: null,
    _socket: null,

    ctor: function (host, port) {
        this._host = host;
        this._port = port;
    },

    connect: function () {
        try {
            var host = "ws://" + this._host + ":" + this._port;
            this._socket = new WebSocket(host);
            this._socket.onopen = (evt) => {
                console.log("[WebSocket]-Open:" + JSON.stringify(evt.data));
                this._broadcastReciveData(SOCKET_EVENT.OPENE, evt.data);
            };

            this._socket.onmessage = (evt) => {
                console.log("[WebSocket]-Message:" + JSON.stringify(evt.data));
                var bufferArray = JSON.parse(evt.data);
                var buf = new Uint8Array(bufferArray);
                this._broadcastReciveData(SOCKET_EVENT.MESSAGE, buf);
                var d = app.proto.decode(buf);
                console.log("[WebSocket]-parse:" + JSON.stringify(d));
            };

            this._socket.onerror = (evt) => {
                console.log("[WebSocket]-Error:" + JSON.stringify(evt.data));
                this._broadcastReciveData(SOCKET_EVENT.ERROR, evt.data);
            };

            this._socket.onclose = (evt) => {
                console.log("[WebSocket]-Error:" + JSON.stringify(evt.data));
                this._broadcastReciveData(SOCKET_EVENT.CLOSE, evt.data);
            };
        } catch (exception) {
            console.log("[WebSocket]-Exception:" + exception);
        }
    },

    send: function (data) {
        // var str = String.fromCharCode.apply(null, data);
        // console.log("data:"+str);
        if (this._socket.readyState == WebSocket.OPEN) {
            this._socket.send(data);
        } else {
            console.log("[WebSocket]-readState:" + this.socket.readyState);
        }
    },

    close: function () {
        if (this._socket) {
            console.log("[WebSocket]-Close");
            this._socket.close();
            this._socket = null;
        }
    },

    _broadcastReciveData: function (eventName, data) {
        var event = new cc.EventCustom(eventName);
        event.data = data;
        cc.eventManager.dispatchEvent(event);
    },

    getSocketPipeKey: function () {
        return this._host + "-" + this._port;
    },

});