/**
 * Created by Berwin on 2017/5/27.
 */
var flurry = cc.Class.extend({

    _clsName: null,

    ctor: function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this._clsName = "org/cocos2dx/javascript/FlurryInterface";
        } else {
            this._clsName = "FlurryInterface";
        }
    },

    logEvent: function logEvent(name) {
        cc.callNativeStaticMethod(this._clsName, logEvent);
    },

    logEventWithParams: function logEventWithParams(name, params) {
        cc.callNativeStaticMethod(this._clsName, logEventWithParams);
    },

    logEventWithTimed: function logEventWithTimed(name, timed) {
        cc.callNativeStaticMethod(this._clsName, logEventWithTimed);
    },

    logEventWithParmsAndTimes: function logEventWithParmsAndTimes(name, params, timed) {
        cc.callNativeStaticMethod(this._clsName, logEventWithParmsAndTimes);
    },

    endEvent: function endEvent(name, params) {
        cc.callNativeStaticMethod(this._clsName, endEvent);
    }
});