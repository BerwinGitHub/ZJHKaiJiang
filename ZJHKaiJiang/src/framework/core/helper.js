/**
 * Created by Berwin on 2017/3/18.
 *
 * #1.helper.ui
 * #2.helper.action
 * #3.helper.audio
 *
 */
var helper = cc.Class.extend({

    ctor: function () {

    },
    /**
     * ui 相关助理方法
     */
    ui: {
        /**
         * 根据名字找到节点(没有意义的方法，只是改个名字)
         * @param parent
         * @param name
         */
        findNodeByName: function (parent, name) {
            // return ccui.helper.seekWidgetByName(parent, name);
            return ccui.helper.seekNodeByName(parent, name);
        },

        /**
         * 得到Cocosstudio里面的数据
         * @param node
         * @returns {*|String}
         */
        getWidgetUserData: function (node) {
            var customProperty = node.getComponent("ComExtensionData");
            return customProperty.getCustomProperty();
        },

        /**
         *
         * @param jsonFile
         * @returns {*}
         */
        loadCCS: function (jsonFile) {
            return ccs.load(jsonFile).node;
        },
    },


    /**
     * 动画相关助理方法
     */
    action: {
        /**
         * 播放studio导出来的动画
         * @param json 动画文件
         * @param parent 父类节点
         * @param pos 位置
         * @param loop 是否循环播放
         */
        playCCSA: function (json, parent, pos, loop = false) {
            var data = ccs.load(json);
            data.node.setPosition(pos);
            parent.addChild(data.node);
            parent.runAction(data.action);
            data.action.gotoFrameAndPlay(0, data.action.getDuration(), 0, loop);
            return helper.animation;
        },
    },

    event: {

        /**
         * 添加点击事件
         * @param node
         * @param callback
         */
        addClickListener: function (node, callback) {
            var listener = new cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: (t, e) => {
                    var target = e.getCurrentTarget();
                    var realPos = target.getParent().convertToNodeSpace(t.getLocation());
                    if (cc.rectContainsPoint(target.getBoundingBox(), realPos)) {
                        return true;
                    }
                    return false;
                },
                onTouchEnded: (t, e) => {
                    var target = e.getCurrentTarget();
                    var realPos = target.getParent().convertToNodeSpace(t.getLocation());
                    if (cc.rectContainsPoint(target.getBoundingBox(), realPos)) {
                        callback(target);
                    }
                }
            });
            cc.eventManager.addListener(listener, node);
        },
    },

    /**
     * audio 相关助理方法
     */
    audio: {
        /**
         * 延迟播放声音
         * @param dt 延迟时间
         * @param file 声音文件
         */
        playEffectWithDelay: function (dt, file) {
            var n = new cc.Node();
            cc.director.getRunningScene().addChild(n);
            n.runAction(cc.sequence(cc.delayTime(dt), cc.callFunc(() => {
                cc.audioEngine.playEffect(file);
            }), cc.removeSelf()));
        },
    },
});