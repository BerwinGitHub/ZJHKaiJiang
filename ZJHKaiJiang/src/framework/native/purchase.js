/**
 * Created by Berwin on 2017/5/27.
 */
var purchase = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this._clsName = "org/cocos2dx/javascript/PurchaseInterface";
        } else {
            this._clsName = "PurchaseInterface";
        }
    },

    purchase: function purchase(sku) {
        cc.callNativeStaticMethod(this._clsName, purchase);
    },

    purchaseUnmanaged: function purchaseUnmanaged(sku) {
        cc.callNativeStaticMethod(this._clsName, purchaseUnmanaged);
    },

    restore: function restore() {
        cc.callNativeStaticMethod(this._clsName, restore);
    },
});