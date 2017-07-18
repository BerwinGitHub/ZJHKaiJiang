/**
 * Created by Berwin on 2017/5/17.
 */
var mjoys = {
    color: {
        background: cc.hexToColor("dedcdd"), // 背景
        button: cc.hexToColor("586CEB"), //  按钮
        line: cc.hexToColor("438a08"), // 绿色
        subject: cc.hexToColor("000000"), //
        subtitle: cc.hexToColor("ca1524"), // 血红
    },
    // 渐变
    gradient: [
        {start: cc.hexToColor("fea5a1"), end: cc.hexToColor("fec3b1")},
        {start: cc.hexToColor("BD7833"), end: cc.hexToColor("C28B38")},
        {start: cc.hexToColor("FFD96A"), end: cc.hexToColor("F4E980")},// j
        {start: cc.hexToColor("99877B"), end: cc.hexToColor("A07A6F")},// j
        {start: cc.hexToColor("B83640"), end: cc.hexToColor("CE4648")},
        {start: cc.hexToColor("96AC01"), end: cc.hexToColor("B5D100")},
        {start: cc.hexToColor("518D67"), end: cc.hexToColor("729B71")}
    ],
    randGradien: function () {
        var idx = cc.app.core.randomInt(0, this.gradient.length);
        return this.gradient[idx];
    },
};

cc.mjoys = mjoys;