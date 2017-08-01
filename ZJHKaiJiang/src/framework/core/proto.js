/**
 * Created by Berwin on 2017/5/1.
 */
var proto = cc.Class.extend({

    roots: null,

    ctor: function () {
        // register loader *.proto
        this.roots = [];
        var loader = {
            load: (realUrl, url, res, cb) => {
                if (/*cc.sys.isNative &&*/ !this.isFristLoad) {
                    this.isFristLoad = true;
                    protobuf.util.fetch = fetch;
                }
                cc.loader.loadTxt(url, (err, source) => {
                    if (err) {
                        cc.log("loadTxt err:" + err + "\turl:" + url);
                        return;
                    }
                    // 1.先将这个放入到缓存中
                    delete cc.loader.cache[url];
                    cc.loader.cache[url] = source;
                    // 2.再加载
                    protobuf.load(url, (err, root) => {
                        if (err) {
                            cb(err, null);
                            return;
                        }
                        this.roots.push(root);
                        cb(err, root);
                    });
                });
            }
        };

        /**
         * 将其指定给protobuf.util.fetch方法，将加载文件的方法改成coocos的
         * @param filename
         * @param cb
         */
        var fetch = function (filename, cb) {
            var data = cc.loader.cache[filename];
            if (!data) {
                cc.loader.loadTxt(filename, (err, source) => {
                    if (err) {
                        cc.log("loadTxt err:" + err + "\turl:" + url);
                        cb(err, source);
                        return;
                    }
                    cb(err, source);
                });
            } else {
                cb(null, data);
            }
        };
        // cc.loader.register(["proto"], loader);
    },

    /**
     * 将对象转成字节
     * @param messageName
     * @param payload
     * @returns {*}
     */
    bytesify: function (message, payload) {
        var pd = message.create(payload);
        return message.encode(pd).finish();
        // var ProtoMessage = this._getMessage(message);
        // var err = ProtoMessage.message.verify(payload);
        // if (err) {
        //     console.log("Message:(" + message + ") verify payload err:" + err);
        //     return null;
        // }
        // var message = ProtoMessage.message.create(payload);
        // var buffer = ProtoMessage.message.encode(message).finish();
        // return buffer;
    },

    /**
     * 解析成对象
     * @param messageName
     * @param buffer
     * @returns {*|Message.<{}>|number|{}|T|String}
     */
    parse: function (messageName, buffer) {
        var Msg = this._getMessage(messageName);
        var msg = Msg.message.decode(buffer);
        return msg;
    },

    /**
     * 解析从服务器发来的数组字符串
     * @param data
     */
    parseFromArrayString: function (message, data) {
        var buffer = data.split(','); // 不用用JSON.parse("[]") 在iOS上面不能转成数组，最好用拆分的方式
        var u8 = new Uint8Array(buffer);
        return message.decode(u8);
        // return this.parse(message, u8);
    },

    /**
     * 得到MessageType的枚举类
     * @returns {*}
     */
    getEnum: function (enumName) {
        for (var i = 0; i < this.roots.length; i++) {
            var findEnum = null;
            try {
                findEnum = this.roots[i].lookupTypeOrEnum(enumName);
                return findEnum.values; // 如果不throw err就表明找到了，并返回
            } catch (e) {
            }
        }
        cc.log("Not find proto Enum:" + name);
        return null;
    },

    /**
     * 在缓存中找到Message
     * @param name
     * @returns {*}
     * @private
     */
    _getMessage: function (name) {
        for (var i = 0; i < this.roots.length; i++) {
            var msg = null;
            try {
                msg = this.roots[i].lookupType(name);
                return {message: msg}; // 如果不throw err就表明找到了，并返回
            } catch (e) {
            }
        }
        cc.log("Not find proto message:" + name + "\tlenght:" + this.roots.length);
        return null;
    },

});