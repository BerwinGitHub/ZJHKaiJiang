/**
 * Created by Berwin on 2017/5/28.
 */
var visiblerect = cc.Class.extend({

    offsetX: 0, // x的偏移量
    offsetY: 0, // y的偏移量

    LAYOUT: {
        NONE: 0,    // 没有布局
        LEFT: 1,    // 靠左对齐
        RIGHT: 2,   // 靠右对齐
        TOP: 3,     // 靠上对齐
        BOTTOM: 4,  // 靠下对齐
    },

    ctor: function () {
    },


    /**
     * 设置适配模式
     * @param width
     * @param height
     */
    setupVisibleRect: function (width, height) {
        var ds = cc.size(width, height); // DesignSize
        // var glView = cc.director.getOpenGLView();
        var frameSize = cc.view.getFrameSize();
        var sx = frameSize.width / ds.width;
        var sy = frameSize.height / ds.height;
        var ms = Math.min(sx, sy);

        var rds = cc.size(frameSize.width / ms, frameSize.height / ms);
        this.offsetX = (rds.width - ds.width) * 0.5;
        this.offsetY = (rds.height - ds.height) * 0.5;
        cc.view.setDesignResolutionSize(rds.width, rds.height, cc.ResolutionPolicy.NO_BORDER);
        cc.visibleSize = cc.director.getVisibleSize();
        cc.app.log.i(JSON.stringify(rds));
    },

    /**
     * 设置位置
     * @param node
     * @param x
     * @param y
     * @param borderX
     * @param borderY
     */
    setPosition: function (node, x, y, borderX = this.LAYOUT.NONE, borderY = this.LAYOUT.NONE) {
        var vSize = cc.director.getVisibleSize();
        var nSize = node.getContentSize();
        var anchor = node.getAnchorPoint();

        if (borderX == this.LAYOUT.NONE) {
            x = this.offsetX + x;
        } else if (borderX == this.LAYOUT.LEFT) {
            x = x + nSize.width * anchor.x;
        } else if (borderX == this.LAYOUT.RIGHT) {
            x = vSize.width - x - nSize.width * (1 - anchor.x);
        }

        if (borderY == this.LAYOUT.NONE) {
            y = this.offsetY + y;
        } else if (borderY == this.LAYOUT.BOTTOM) {
            y = y + nSize.height * anchor.y;
        } else if (borderY == this.LAYOUT.TOP) {
            y = vSize.height - y - nSize.height * (1 - anchor.y);
        }
        node.setPosition(x, y);
    },

    /**
     * 得到适配模式的位置
     * @param node
     * @param x
     * @param y
     * @param borderX
     * @param borderY
     * @returns {cc.Point|{x, y}}
     */
    getPosition: function (node, x, y, borderX = this.LAYOUT.NONE, borderY = this.LAYOUT.NONE) {
        var posX = x + this.offsetX;
        var posY = y + this.offsetY;

        if (borderX == this.LAYOUT.LEFT) {
            posX = this.offsetX - posX;
        } else if (borderX == this.LAYOUT.RIGHT) {
            posX = this.offsetX + posX;
        }
        if (borderY == this.LAYOUT.TOP) {
            posY = this.offsetY + posY;
        } else if (borderY == this.LAYOUT.BOTTOM) {
            posY = this.offsetY - posY;
        }
        return cc.p(posX, posY);
    },

});