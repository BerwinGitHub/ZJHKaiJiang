/**
 * Created by Berwin on 2017/5/27.
 */

var AdEvent = [
    "event_banner_state_changed",
    "event_interstitial_state_changed",
    "event_rewardedvido_state_changed"
];

var ad = cc.Class.extend({

    _clsName: null,

    /**
     * 广告类型
     */
    AdType: {
        Banner: 0,    // Banner(横幅)广告
        Interstitial: 1,    // Interstitial(全屏/非插页式)广告
        RrewardedVideo: 2,     // RewardedVideo(视频/激励)广告
        NativeAd: 3             // NativeAd(原生)广告
    },
    /**
     * 方法类型
     */
    MethodType: {
        Loaded: 0,    // 广告加载成功
        FailedToLoad: 1,    // 广告加载失败
        LeftApplication: 2,    // 离开应用
        Open: 3,    // 广告被打开
        Closed: 4,    // 广告已经关闭
        Started: 5,    // 广告开始(一般在视屏广告中，表示视屏点击开始)
        Rewarded: 6,    // 获得视频广告的奖励
        WillClose: 7,    // 广告将要关闭 - for ios
        FailedOpen: 8     // 广告展示失败 - for ios
    },
    BannerGravity: {
        Top: 0, // Banner(横幅)广告在顶部显示
        Bottom: 1,  // Banner(横幅)广告在底部显示
    },

    ctor: function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            this._clsName = "org/cocos2dx/javascript/AdInterface";
        } else {
            this._clsName = "AdInterface";
        }
        // 添加监听
        this.setDelegate(({adType, methodType, available, amount, err}) => {
            cc.app.log.i("adType:" + adType + "\tmethodType:" + methodType + "\tavailable:" + available + "\tamount:" + amount + "\terr:" + err);
            cc.app.events.emit(AdEvent[adType], available);
            if (methodType == this.MethodType.Rewarded) {
                cc.app.log.i("Get reward coin amount:" + amount);
            }
        });
    },

    preload: function preload(type) {
        cc.callNativeStaticMethod(this._clsName, preload);
    },

    preloadAll: function preloadAll() {
        cc.callNativeStaticMethod(this._clsName, preloadAll);
        cc.app.native.nv.makeToast("Please check log.")
    },

    show: function show(type) {
        cc.callNativeStaticMethod(this._clsName, show);
    },

    hide: function hide(type) {
        cc.callNativeStaticMethod(this._clsName, hide);
    },

    isAvailable: function isAvailable(type) {
        return cc.callNativeStaticMethod(this._clsName, isAvailable);
    },

    isShown: function isShown(type) {
        return cc.callNativeStaticMethod(this._clsName, isShown) == "true";
    },

    getGravity: function getGravity() {
        var gravity = cc.callNativeStaticMethod(this._clsName, getGravity);
        return parseInt(gravity);
    },

    setGravity: function setGravity(gravity) {
        cc.callNativeStaticMethod(this._clsName, setGravity);
    },

    setDelegate: function setDelegate(delegate) {
        cc.callNativeStaticMethod(this._clsName, setDelegate);
    },
});