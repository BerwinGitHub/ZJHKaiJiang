/**
 * Created by Berwin on 2017/4/30.
 */
var events = cc.Class.extend({

    ctor: function () {

    },

    /**
     * 添加监听并在该节点,节点移除的时候自动移除
     * @param parent
     * @param eventName
     * @param callback
     */
    onNode: function (parent, eventName, callback) {
        new eventnode(parent, eventName, callback);
    },

    register: function (eventName, callback) {
        var listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: eventName,
            callback: function (event) {
                callback && callback(event.getUserData());
            }.bind(this),
        });
        cc.eventManager.addListener(listener.clone(), 1);
        return listener;
    },

    /**
     * 移除事件 暂时不需要这个东西，因为上面的的方法会自动在移除节点的时候remove掉自己
     * @param listener
     */
    unRegister: function (listener) {
        cc.eventManager.removeListener(listener);
    },

    /**
     * 开始广播
     * @param eventName
     */
    emit: function (eventName, data = null) {
        var event = new cc.EventCustom(eventName);
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },

});
