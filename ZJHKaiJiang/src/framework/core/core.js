/**
 * Created by Berwin on 2017/5/28.
 */
var core = cc.Class.extend({

    ctor: function () {
    },
    /**
     * 生成一个随机数{Number}(min <= {Number} < max)
     * @param n 最小值
     * @param m 最大值
     * @returns {Number} 生成的数
     */
    randomInt: function (n, m) {
        var ex = m - n;
        var num = Math.random() * ex + n;
        return parseInt(num, 10);
    },

    /**
     * 打乱数组
     */
    random_shuffle: function (arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
            var n = parseInt(Math.random() * l);
            arr[i] = [arr[n], arr[n] = arr[i]][0];//执行随机位置调换
        }
        return arr;
    },

    /**
     * 得到时间毫秒数
     * @returns {number}
     */
    currentTimeMillis: function () {
        return new Date().getTime();
    },

    /**
     * 生成uuid
     * @returns {string}
     */
    uuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * 生成权重数据下标
     * @param spec the spec [0.999, 0.001] will break this impl.
     * @returns {*}
     */
    weights: function (spec) {
        var table = []; // 按照权重放入指定个下标的集合
        for (var i = 0; i < spec.length; i++)
            for (var j = 0; j < spec[i] * 10; j++)
                table.push(i);
        return table[Math.floor(Math.random() * table.length)];
    },
});