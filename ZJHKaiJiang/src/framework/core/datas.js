/**
 * Created by Berwin on 2017/5/28.
 */
var datas = cc.Class.extend({

    ctor: function () {
        // js文件加载完了之后，将cc.datas 里面的数据转过来
        for (var key in cc.datas) {
            this[key] = cc.datas[key];
        }
        cc.datas = null;
    },

});