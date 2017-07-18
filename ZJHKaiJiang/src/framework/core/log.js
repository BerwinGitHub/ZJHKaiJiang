/**
 * Created by Berwin on 2017/4/30.
 */
var log = cc.Class.extend({
    BROAD_CAST_LOG: "log_broadcast",
    HEX_COLOR: {
        "error": "#FF0000",
        "warn": "#FFE500",
        "debug": "#FF9500",
        "assert": "#FFF1DE",
        "info": "#006FFF",
        "verbose": "#BBBBBB"
    },

    logCache: null,

    ctor: function () {
        this.logCache = [];
        this.v = this.verbose;
        this.i = this.info;
        this.a = this.assert;
        this.d = this.debug;
        this.e = this.error;
    },

    clear: function () {
        // 清空数组
        this.logCache.splice(0, this.logCache.length);
    },

    /**
     * 信息级别
     * @param tag
     * @param msg
     */
    info: function (tag, msg) {
        if (!msg) { // 只传入一个值就默认为是log 的msg
            msg = tag;
            tag = "";
        }
        var d = new Date();
        var time = /*d.toLocaleDateString() + " " + */d.toLocaleTimeString();
        var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.info)};
        this._insertLog(log);
        console.log("[info]" + time + "\t" + tag + "\t" + msg);
    },

    /**
     * 调试级别
     * @param tag
     * @param msg
     */
    debug: function (tag, msg) {
        if (!msg) { // 只传入一个值就默认为是log 的msg
            msg = tag;
            tag = "";
        }
        var d = new Date();
        var time = /*d.toLocaleDateString() + " " + */d.toLocaleTimeString();
        var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.debug)};
        this._insertLog(log);
        console.log("[debug]" + time + "\t" + tag + "\t" + msg);
    },

    /**
     * 警告级别
     * @param tag
     * @param msg
     */
    warn: function (tag, msg) {
        if (!msg) { // 只传入一个值就默认为是log 的msg
            msg = tag;
            tag = "";
        }
        var d = new Date();
        var time = /*d.toLocaleDateString() + " " + */d.toLocaleTimeString();
        var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.warn)};
        this._insertLog(log);
        console.log("[warn]" + time + "\t" + tag + "\t" + msg);
    },

    /**
     * 错误级别
     * @param tag
     * @param msg
     */
    error: function (tag, msg) {
        if (!msg) { // 只传入一个值就默认为是log 的msg
            msg = tag;
            tag = "";
        }
        var d = new Date();
        var time = /*d.toLocaleDateString() + " " + */d.toLocaleTimeString();
        var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.error)};
        this._insertLog(log);
        console.log("[error]" + time + "\t" + tag + "\t" + msg);
    },

    /**
     * 详细信息级别
     * @param tag
     * @param msg
     */
    verbose: function (tag, msg) {
        if (!msg) { // 只传入一个值就默认为是log 的msg
            msg = tag;
            tag = "";
        }
        var d = new Date();
        var time = /*d.toLocaleDateString() + " " + */d.toLocaleTimeString();
        var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.verbose)};
        this._insertLog(log);
        console.log("[verbose]" + time + "\t" + tag + "\t" + msg);
    },

    /**
     * 断言级别
     * @param tag
     * @param msg
     */
    assert: function (tag, msg) {
        if (!msg) { // 只传入一个值就默认为是log 的msg
            msg = tag;
            tag = "";
        }
        var d = new Date();
        var time = /*d.toLocaleDateString() + " " + */d.toLocaleTimeString();
        var log = {time: time, tag: tag, msg: msg, color: cc.hexToColor(this.HEX_COLOR.assert)};
        this._insertLog(log);
        console.log("[assert]" + time + "\t" + tag + "\t" + msg);
    },

    _insertLog: function (log) {
        this.logCache.push(log);
        cc.app.events.emit(this.BROAD_CAST_LOG, log);
    },

});