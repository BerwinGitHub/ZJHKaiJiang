/**
 * Created by Berwin on 2017/5/28.
 */
var APP_ID = "1233991607";
var configs = cc.Class.extend({

    ctor: function () {
        // 当前是否是调试模式
        this.debug = true;
        // 隐私政策网址
        this.privacyUrl = "https://baidu.com";
        // this.privacyUrl = "https://metrojoys.wixsite.com/home/privacy";
        // 广告Admob相关ID
        this.admob = {
            app_id: "ca-app-pub-7242779887458735~5489457609",
            banner_unit_id: "ca-app-pub-7242779887458735/6966190802",
            interstitial_unit_id: "ca-app-pub-7242779887458735/8442924009",
            rewardedvideo_unit_id: "ca-app-pub-7242779887458735/9919657209",
            native_unit_id: "ca-app-pub-7242779887458735/3873123607",
            testDevices: [
                "360bba314fc22465aabcef6274555c2719866d29", // Berwin's iPhone
                "e0923bbd23d41521fde1db204b5ce35d3597172b"
            ]
        };
        // 苹果相关
        this.apple = {
            app_id: APP_ID,
            app_url: "https://itunes.apple.com/app/id" + APP_ID,
        };
        // facebook相关的ID信息
        this.facebook = {
            app_id: "2285093955049398",
            invite_app_url: "https://itunes.apple.com/app/id" + APP_ID,
            invite_image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497165678&di=447df2ef3c9688da895af49b9969e225&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.safesail.cn%2FUploadFile%2FPhoto%2F2015-5%2F2015521wrc3qew-nn.jpg",
            invite_promot_text: "", // 优惠信息文字
            invite_promot_code: "", // 应用优惠信息代码

            share_app_url: "https://itunes.apple.com/app/id" + APP_ID,
        };
        // flurry分析统计
        this.flurry = {
            api_key: "PZSQZPBST9SVTV229M5Q"
        };
        // 内购的相关信息
        this.purchase = {
            skus: ["com.mjoys.circle.removeAds", "com.mjoys.circle.buyCoins"]
        };

        // 将数据发送给本地代码
        var clsName = cc.sys.os == cc.sys.OS_ANDROID ? "org/cocos2dx/javascript/ConfigManager" : "ConfigManager";
        cc.callNativeStaticMethod(clsName, "setUpConfigsByJaveScript", this);
    },
});