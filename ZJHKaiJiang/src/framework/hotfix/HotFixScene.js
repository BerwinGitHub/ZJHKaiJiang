/**
 * Created by Berwin on 2017/3/18.
 */

var AssetUpdater = cc.Class.extend({

    /**
     * 重试次数
     */
    _retryCount: 2,
    /**
     * 当前下载的次数
     */
    _currentCount: 0,
    /**
     * 超时(单位:毫秒)
     */
    _timeout: 15000,
    /**
     * 资源管理对象
     */
    _assetsManager: null,
    /**
     * 更新中的回调
     */
    _progressCallback: null,
    /**
     * 更新完之后回调
     */
    _completeCallback: null,
    /**
     * 事件回调
     */
    _listener: null,

    /**
     * 更新的版本文件地址
     */
    _manifestFile: null,

    /**
     * 定时器集合
     */
    _timers: null,

    ctor: function (manifestFile) {
        this._manifestFile = manifestFile;
        this._timers = [];
        if (cc.sys.isNative) {
            this._initAssetManager();
        }
    },

    _initAssetManager: function () {
        if (this._assetsManager)
            return;
        console.log("[HotFix]-_initAssetManager");
        // 存储路径
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        // 创建AssertManager对象，加载manifest清单文件
        this._assetsManager = new jsb.AssetsManager(this._manifestFile, storagePath);
        this._assetsManager.retain();
        if (!this._assetsManager.getLocalManifest().isLoaded()) {// 加载manifest文件失败，跳过更新
            this._failed();
            return;
        }
        var that = this;
        // AssertManager 更新监听
        this._listener = new jsb.EventListenerAssetsManager(this._assetsManager, (event) => {
            // cc.log("event:" + JSON.stringify(event));
            switch (event.getEventCode()) {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:// 没有找到本地清单文件
                    cc.log("HotFix:" + "ERROR_NO_LOCAL_MANIFEST");
                    that._failed();
                    break;
                case jsb.EventAssetsManager.UPDATE_PROGRESSION:// 更新的进度回调
                    cc.log("HotFix:" + "UPDATE_PROGRESSION");
                    that._progress(event.getPercentByFile(), event.getPercent());
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:// 下载服务器清单文件错误
                    cc.log("HotFix:" + "ERROR_DOWNLOAD_MANIFEST");
                    that._failed();
                    break;
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:// 解析清单文件错误
                    cc.log("HotFix:" + "ERROR_PARSE_MANIFEST");
                    that._failed();
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:// 已经更新
                    cc.log("HotFix:" + "ALREADY_UP_TO_DATE");
                    that._complete();
                    break;
                case jsb.EventAssetsManager.UPDATE_FINISHED:// 本次更新成功
                    cc.log("HotFix:" + "UPDATE_FINISHED");
                    that._complete();
                    break;
                case jsb.EventAssetsManager.UPDATE_FAILED:// 更新失败
                    cc.log("HotFix:" + "UPDATE_FAILED");//
                    that._failed();
                    break;
                case jsb.EventAssetsManager.ERROR_UPDATING:// 更新中失败
                    cc.log("HotFix:" + "ERROR_UPDATING");
                    cc.log("error: " + event.getAssetId() + ", " + event.getMessage());
                    that._failed();
                    break;
                case jsb.EventAssetsManager.ERROR_DECOMPRESS: // 更新成功，但是解析失败
                    cc.log("HotFix:" + "ERROR_DECOMPRESS");
                    that._failed();
                    break;
                default:
                    that._failed();
                    break;
            }

        });
        cc.eventManager.addListener(this._listener, 1);
    },

    startUpdate: function (cbProgress, cbComplete) {
        cbProgress && (this._progressCallback = cbComplete);
        cbComplete && (this._completeCallback = cbComplete);
        if (!cc.sys.isNative) {
            this._complete();
            return;
        }
        this._assetsManager.update();
        this._checkTimeoutStart();
    },

    _checkTimeoutStart: function () {
        this._checkTimeoutStop();
        var timer = setTimeout(() => {
            console.log("[HotFix]-_checkTimeoutStart-timeout");
            this._complete();
        }, this._timeout);
        this._timers.push(timer);
    },

    _checkTimeoutStop: function () {
        this._timers.forEach((timer) => {
            clearTimeout(timer);
        });
        this._timers.splice(0, this._timers.length);
    },

    _progress: function (filePercent, totalPercent) {
        this._checkTimeoutStop();
        this._progressCallback && this._progressCallback(filePercent, totalPercent);
    },

    _complete: function () {
        this._checkTimeoutStop();
        // 释放掉热更新的东西
        this._destoryAssetsmanager(() => {
            this._completeCallback && this._completeCallback();
        });
    },

    _failed: function () {
        this._checkTimeoutStop();
        console.log("[HotFix]-failed currentCount:" + this._currentCount);
        if (++this._currentCount >= this._retryCount) { // 大于了最大的尝试次数
            this._complete();
        } else { // 重新开始下载
            console.log("[HotFix]-re update");
            this._assetsManager.downloadFailedAssets();
            this._destoryAssetsmanager(() => {
                // 重新初始化
                this._initAssetManager();
                this.startUpdate();
            });
        }
    },

    _destoryAssetsmanager: function (destoryFinish) {
        if (this._listener) {
            cc.eventManager.removeListener(this._listener);
            this._listener = null;
        }
        if (this._assetsManager) {
            this._assetsManager.release();
            // 保证在下一帧执行，确保对象移除
            cc.director.getScheduler().schedule(() => {
                this._assetsManager = null;
                destoryFinish();
            }, this, 0, 0, 0.15, false, "next_frame_removed");
        } else {
            destoryFinish();
        }
    },
});


/**
 * 自动更新js和资源
 */
var HotFixScene = cc.Scene.extend({
    /**
     * 进度
     */
    _progress: null,

    /**
     * 更新器
     */
    _updater: null,

    runWithCallback: function (manifestFile, loadJavaScriptFinishCallback, loadResourcesFinishCallback) {
        this._loadJavaScriptFinishCallback = loadJavaScriptFinishCallback;
        this._loadResourcesFinishCallback = loadResourcesFinishCallback;
        // 运行当前场景
        cc.director.runScene(this);
        // 初始化U
        this._initUi();
        this._initUpdater(manifestFile);
    },

    onEnter: function () {
        this._super();
        this._updater.startUpdate((filePercent, totalPercent) => {
            this._progress.stringify = "percent:" + totalPercent + "%";
        }, () => {
            this._progress.stringify = "percent:100%";
            this.loadGame();
        });
    },

    onExit: function () {
        this._super();
    },

    _initUi: function () {
        var layer = new cc.Layer();
        this.addChild(layer);
        this._progress = new cc.LabelTTF("update 0%", "Arial", 20);
        this._progress.x = cc.winSize.width / 2;
        this._progress.y = 20;
        this.addChild(this._progress);
    },

    _initUpdater: function (manifestFile) {
        this._updater = new AssetUpdater(manifestFile);
    },

    loadGame: function () {
        //jsList是jsList.js的变量，记录全部js文件。
        // 加载包含js文件的jsList.js文件 & 包含资源文件的resource.js文件
        cc.loader.loadJs("src/jsList.js", () => {
            // 1.首先加载代码到游戏中,解析proto文件需要先将proto.js引入
            cc.loader.loadJs(jsList, () => {
                // var needLoadJs = ["src/language.js", "src/resource.js"];
                // cc.loader.loadJs(needLoadJs, () => {
                this._loadJavaScriptFinishCallback && this._loadJavaScriptFinishCallback();
                cc.app.log.i("js load finish.");
                // 2.等待代码加载完毕，再加载图片资源
                cc.textureCache.removeAllTextures();// 加载前先移除
                cc.loader.load(g_resources, (rlt, count, loadedCount) => {
                }, () => {
                    cc.app.log.i("res load finish.");
                    // 3.代码和资源都加载完毕，进入游戏
                    this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this._loadResourcesFinishCallback)));
                });
                // });
            });
        });
    },

});
