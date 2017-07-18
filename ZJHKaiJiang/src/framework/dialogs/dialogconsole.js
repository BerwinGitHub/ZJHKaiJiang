/**
 * Created by Berwin on 2017/5/28.
 */

var dialogconsole = Dialog.extend({

    cmdHistory: null,
    fontSize: 20, // log的fontSize
    lineHeight: 0, // 先算出以上面的字号

    ctor: function () {
        // this._super(res.studio_debug_test_json);
        this._super(res.studio_debug_node_debug_json);
        // return;
        //
        this.scrollView = ccui.helper.seekNodeByName(this.node, "scrollView");
        this.consoleView = ccui.helper.seekNodeByName(this.node, "nodeConsole");
        this.scrollView.setVisible(false);
        this.consoleView.setVisible(false);

        // btn
        var btn = ccui.helper.seekNodeByName(this.node, "btnDebug");
        // btn.setLocalZOrder(this.ZORDER.DEBUG);
        btn.addClickEventListener(() => {
            this.scrollView.setVisible(!this.scrollView.isVisible());
        });
        // dot
        this.dot = ccui.helper.seekNodeByName(this.node, "dot");
        this.dot.setVisible(false);

        // console
        var btnConsole = ccui.helper.seekNodeByName(this.node, "btnConsole");
        btnConsole.addClickEventListener(() => {
            this.dot.setVisible(false);
            this.consoleView.setVisible(true);
        });

        // close
        var btnClose = ccui.helper.seekNodeByName(this.node, "btnClose");
        btnClose.addClickEventListener(() => {
            this.consoleView.setVisible(false);
        });

        // historyView
        this.historyView = ccui.helper.seekNodeByName(this.node, "history_view");
        this.historyView.setVisible(false);
        var root = ccui.helper.seekNodeByName(this.historyView, "root");
        root.addTouchEventListener(() => {
            this.historyView.setVisible(false);
        });

        // historyList
        this.historyList = ccui.helper.seekNodeByName(this.node, "lv_history");

        // btnHistory
        this.btnHistory = ccui.helper.seekNodeByName(this.node, "btnHistory");
        this.btnHistory.addClickEventListener(() => {
            this.historyView.setVisible(true);
        });

        // textField
        this.cmdHistory = [
            "cc.winSize"
            , "cc.director.getRunningScene()"
            , "cc.visibleSize"
            , "cc.app.configs"
            , "cc.app.log."
            , "cc.app.native.nv.makeToast"
            , "cc.app.native.nv.showAlertDialog('Title', 'Content', 'Download', 'Cancel')"];
        this.cmdHistory.forEach((cmd) => {
            this._addHistoryToListView(cmd);
        });
        this.textField = ccui.helper.seekNodeByName(this.node, "textField");
        this.textField.setString(this.cmdHistory[this.cmdHistory.length - 1]);
        this.btnExe = ccui.helper.seekNodeByName(this.node, "btnExe");
        this.btnExe.addClickEventListener(() => {
            // 下标在最后一个 才表示是新输入的那么记录
            var txt = this.textField.getString();
            this._checkHistoryRepeat(txt);
            this.cmdHistory.push(txt);
            this._addHistoryToListView(txt);
            try {
                var result = eval(this.textField.getString());
                if (typeof(result) != "undefined") {
                    cc.app.log.i(JSON.stringify(result));
                }
            } catch (e) {
                cc.app.log.e(e);
            }
            this.dot.setVisible(false);
        });

        this._regiserEvent("btnAutoFillLeft", () => {
            var txt = this.textField.getString();
            this.textField.setString(txt + "(");
        });
        this._regiserEvent("btnAutoFillRight", () => {
            var txt = this.textField.getString();
            this.textField.setString(txt + ")");
        });

        this._regiserEvent("btnAutoQuot", () => {
            var txt = this.textField.getString();
            this.textField.setString(txt + "\"");
        });
        this._regiserEvent("btnAutoComma", () => {
            var txt = this.textField.getString();
            this.textField.setString(txt + ",");
        });

        // btnInputCls
        this.btnInputCls = ccui.helper.seekNodeByName(this.node, "btnInputCls");
        this.btnInputCls.addClickEventListener(() => {
            this.textField.setString("");
            // 在中间清除的时候，下边到最后一个
            this.historyIdx = this.cmdHistory.length - 1;
        });
        // cls
        this.btnCls = ccui.helper.seekNodeByName(this.node, "btnClear");
        this.btnCls.addClickEventListener(() => {
            cc.app.log.clear();
            this.list.removeAllItems();
            this.textField.setString("");
            this.dot.setVisible(false);
        });
        // reload
        this.btnReload = ccui.helper.seekNodeByName(this.node, "btnReload");
        this.btnReload.addClickEventListener(() => {
            cc.game.restart();
        });
        // log
        this.list = ccui.helper.seekNodeByName(this.node, "listView");

        // 添加监听
        cc.app.events.onNode(this, cc.app.log.BROAD_CAST_LOG, this.addLog);

        // event
        this._regiserEvent("btnPrivacy", () => {
            cc.app.native.nv.showPrivacyWithURL(cc.app.configs.privacyUrl);
        });

        this._regiserEvent("btnAlertDialog", () => {
            cc.app.native.nv.showAlertDialog("Test", "This is test message", "OK", "Cancel", (data) => {
                cc.app.log.i(JSON.stringify(data));
            });
        });

        this._regiserEvent("btnShareSystem", () => {
            cc.app.native.nv.systemShare("Share Title", "Share Content.", "");
        });
        this._regiserEvent("btnToast", () => {
            cc.app.native.nv.makeToast("toast content meesage.", 3000);
        });

        //
        var containor = ccui.helper.seekNodeByName(this.node, "httpSpriteContainor");
        var hs = new HttpSprite();
        containor.addChildToCenter(hs);
        this._regiserEvent("btnLoadImg1", () => {
            hs.loadSpriteByUrl("https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=930562350,2384138428&fm=58");
        });
        this._regiserEvent("btnLoadImg2", () => {
            hs.loadSpriteByUrl("https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1500729002,1758147343&fm=58");
        });

        // ADS
        this._regiserEvent("btnShowBanner", () => {
            cc.app.native.ad.show(0);
        });
        this._handleEventVisible("btnShowBanner", AdEvent[cc.app.native.ad.AdType.Banner]);
        this._regiserEvent("btnHideBanner", () => {
            cc.app.native.ad.hide(0);
        });
        this._regiserEvent("btnGravity", () => {
            var gravity = cc.app.native.ad.getGravity();
            if (gravity == cc.app.native.ad.BannerGravity.Top) {
                cc.app.native.ad.setGravity(cc.app.native.ad.BannerGravity.Bottom);
            } else {
                cc.app.native.ad.setGravity(cc.app.native.ad.BannerGravity.Top);
            }
        });
        this._regiserEvent("btnShowInterstitial", () => {
            cc.app.native.ad.show(1);
        });
        this._handleEventVisible("btnShowInterstitial", AdEvent[cc.app.native.ad.AdType.Interstitial]);
        this._regiserEvent("btnShowRewarded", () => {
            cc.app.native.ad.show(2);
        });
        this._handleEventVisible("btnShowRewarded", AdEvent[cc.app.native.ad.AdType.RrewardedVideo]);
        this._regiserEvent("btnShowNative", () => {
            cc.app.native.ad.show(3);
        });
        this._regiserEvent("btnPreloadAll", () => {
            cc.app.native.ad.preloadAll();
        });

        // Facebook
        this._regiserEvent("btnLogin", () => {
            cc.app.native.facebook.login(["public_profile", "user_friends", "email"]);
        });
        this._regiserEvent("btnIsLogin", () => {
            var login = cc.app.native.facebook.isLogin();
            cc.app.native.nv.makeToast("登录状态:" + login, 5 * 1000);
        });
        this._regiserEvent("btnAccessToken", () => {
            var token = cc.app.native.facebook.getAccessToken();
            cc.app.log.i(token);
            cc.app.native.nv.makeToast("Please check log.");
        });
        this._regiserEvent("btnShare", () => {
            cc.app.native.facebook.share();
        });
        this._regiserEvent("btnInvite", () => {
            cc.app.native.facebook.invite();
        });
        // 注册登录成功事件
        cc.app.events.onNode(this, cc.app.native.facebook.EVENT_FB_LOGIN_SUCCESS, (data) => {
            //small, normal, album, large, square
            var url = "http://graph.facebook.com/" + data.userID + "/picture?type=normal";
            cc.app.log.i("FBHeader", url);
            hs.loadSpriteByUrl(url);
        });
        this._regiserEvent("btnHeader", () => {
            if (cc.app.player.facebookToken) {
                var userID = cc.app.player.facebookToken.userID;
                var url = "http://graph.facebook.com/" + userID + "/picture?type=normal";
                hs.loadSpriteByUrl(url);
            } else {
                cc.app.native.nv.makeToast("请先登录Facebook.", 5 * 1000);
            }
        });
        // Flurry
        this._regiserEvent("btnEvent", () => {
            cc.app.native.flurry.logEvent("click");
            cc.app.native.nv.makeToast("#Flurry->:click", 3000);
        });
        this._regiserEvent("btnEventParams", () => {
            cc.app.native.flurry.logEventWithParams("params", {"params1": 1, "params2": true});
            cc.app.native.nv.makeToast("#Flurry->:params " + JSON.stringify({"params1": 1, "params2": true}), 3000);
        });
        this._regiserEvent("btnEventTimed", () => {
            cc.app.native.flurry.logEventWithTimed("timed", true);
            cc.app.native.nv.makeToast("#Flurry->:timed start", 3000);
        });
        this._regiserEvent("btnEndTimed", () => {
            cc.app.native.flurry.endEvent("timed");
            cc.app.native.nv.makeToast("#Flurry->:timed end", 3000);
        });
        this._regiserEvent("btnEventParamsTimed", () => {
            cc.app.native.flurry.logEventWithParmsAndTimes("params&timed", {"params1": 1, "timed": true}, true);
            cc.app.native.nv.makeToast("#Flurry->:params&timed start" + JSON.stringify({
                    "params1": 1,
                    "timed": true
                }) + "-true", 3000);
            this.runAction(cc.sequence(cc.delayTime(3.0), cc.callFunc(() => {
                cc.app.native.flurry.endEvent("params&timed");
                cc.app.native.nv.makeToast("#Flurry->:params&timed end", 3000);
            })));
        });
    },

    addLog: function (item) {
        this.dot.setVisible(!this.consoleView.isVisible());
        var str = item.time + "\t\t" + item.tag + "\t\t" + item.msg;
        var txt = new cc.LabelTTF(str, null, 20, cc.size(this.list.width, 0));
        txt.setAnchorPoint(cc.p(0, 0));
        // txt.setLineHeight(txt.getLineHeight() * 1);
        txt.color = item.color;
        var pan = new ccui.Layout();
        pan.addChild(txt);
        pan.setContentSize(cc.size(txt.width, txt.height));
        this.list.pushBackCustomItem(pan);
        this.list.jumpToBottom();// scrollToPercentVertical
    },

    _checkHistoryRepeat: function (txt) {
        for (var i = 0; i < this.cmdHistory.length; i++) {
            var item = this.cmdHistory[i];
            if (item === txt) {
                this.cmdHistory.splice(i, 1);
                this.historyList.removeItem(this.historyList.getItems().length - i - 1);
                return;
            }
        }
    },

    _addHistoryToListView: function (txt) {
        var txt = new cc.LabelTTF(txt, null, 25, cc.size(this.historyList.width, 0));
        txt.setName("txt");
        txt.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        txt.setVerticalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        txt.setAnchorPoint(cc.p(0, 0));
        var pan = new ccui.Layout();
        pan.addChild(txt);
        pan.setContentSize(cc.size(txt.width, txt.height + 10));
        pan.setTouchEnabled(true);
        pan.addClickEventListener(() => {
            var txt = pan.getChildByName("txt").getString();
            this.textField.setString(txt);
            this.historyView.setVisible(false);
        });
        this.historyList.insertCustomItem(pan, 0);
        this.historyList.jumpToTop();
    },

    _regiserEvent: function (name, callback) {
        var btn = ccui.helper.seekNodeByName(this.node, name);
        btn.addClickEventListener(callback);
    },

    _handleEventVisible: function (name, eventName) {
        var btn = ccui.helper.seekNodeByName(this.node, name);
        var dot = btn.getChildByName("dot_ad");
        cc.app.events.onNode(dot, eventName, (visible) => {
            dot.visible = visible;
        });
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        // this.item.release();
        this._super();
    },


});