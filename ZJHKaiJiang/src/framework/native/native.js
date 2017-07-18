/**
 * Created by Berwin on 2017/5/27.
 */
var native = cc.Class.extend({

    ctor: function (app) {
        this.ad = new ad();
        this.facebook = new facebook(app);
        this.flurry = new flurry();
        this.nv = new nv();
        this.purchase = new purchase();
    },


});