/**
 * Created by Berwin on 2017/5/22.
 */
var eventnode = cc.Node.extend({
    /**
     * 事件名字
     */
    _eventName: null,

    /**
     * 回调
     */
    _callback: null,

    /**
     * 目标
     */
    _target: null,

    /**
     *
     * @param eventName
     * @param callback
     * @param target
     */
    ctor: function (target, eventName, callback) {
        this._super();
        this._target = target;
        this._eventName = eventName;
        this._callback = callback;
        this._target.addChild(this);
        this._registerEvent();
    },

    _registerEvent: function () {
        this._listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: this._eventName,
            callback: (event) => {
                if (this._target) {
                    this._callback.apply(this._target, [event.getUserData()]);
                } else {
                    this._callback && this._callback(event.getUserData());
                }
            }
        });
        cc.eventManager.addListener(this._listener, 1);
    },

    /**
     * 发送事件
     * @param eventName
     * @param data
     */
    emit: function (eventName, data = null) {
        var event = new cc.EventCustom(eventName);
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._listener && cc.eventManager.removeListener(this._listener);
        this._super();
    },
});