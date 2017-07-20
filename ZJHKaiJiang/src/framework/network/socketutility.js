/**
 * Created by Berwin on 2017/4/5.
 */
var SOCKET_TYPE = {
    SOCKETIO: 0,
    WEBSOCKET: 1,
};

var SocketUtility = cc.Class.extend({

    _socketPipes: null,
    _socketType: SOCKET_TYPE.SOCKETIO,
    _latestKey: null,

    ctor: function (type = SOCKET_TYPE.SOCKETIO) {
        this._socketType = type;
        this._socketPipes = {};
    },

    /**
     *
     * @param host
     * @param port
     * @returns {string}
     */
    connect: function (host, port) {
        var key = host + "-" + port;
        this._latestKey = key;
        var pipe = this._socketPipes[key];
        if (!pipe) {
            if (this._socketType == SOCKET_TYPE.WEBSOCKET) {
                pipe = new SocketPipe(host, port);
            } else if (this._socketType == SOCKET_TYPE.SOCKETIO) {
                pipe = new SocketIoPipe(host, port);
            }
            pipe.connect();
            this._socketPipes[key] = pipe;
        }
        return key;
    },

    /**
     * 得到socket
     * @param key
     * @returns {*}
     */
    getSocket: function (key) {
        key = key ? key : this._latestKey;
        return this._socketPipes[key];
    },

    /**
     *
     * @param key
     * @param eventName
     * @param callback 取消这个参数，请用cc.app.events.onNode(this extends cc.Node, <eventName>, function);
     */
    on: function (eventName, key) {
        key = key ? key : this._latestKey;
        var pipe = this._socketPipes[key];
        if (pipe && pipe.on) {
            pipe.on(eventName);
        }
    },

    /**
     *
     * @param key
     * @param data
     */
    send: function (data, key) {
        key = key ? key : this._latestKey;
        var pipe = this._socketPipes[key];
        if (pipe) {
            pipe.send(data);
        }
    },

    /**
     *
     * @param key
     * @param eventName
     * @param data
     */
    emit: function (eventName, data, key) {
        key = key ? key : this._latestKey;
        var pipe = this._socketPipes[key];
        if (pipe && pipe.emit) {
            pipe.emit(eventName, data);
        }
    },

    /**
     *
     * @param key
     */
    close: function (key) {
        key = key ? key : this._latestKey;
        var pipe = this._socketPipes[key];
        if (pipe) {
            pipe.close();
        }
    },
});
