/**
 * Created by Berwin on 2017/5/31.
 */
var HttpSprite = cc.Sprite.extend({

    _imgUrl: null,

    ctor: function (imgUrl) {
        this._super();
        if (imgUrl)
            this.loadSpriteByUrl(imgUrl);
    },

    loadSpriteByUrl: function (imgUrl) {
        this._imgUrl = imgUrl;
        cc.loader.loadImg(this._imgUrl, {isCrossOrigin: true}, (err, image) => {
            this.imageLoadFinish(err, image);
        });
    },

    /**
     * 图片加载完毕
     * @param err
     * @param texture
     */
    imageLoadFinish: function (err, image) {
        if (err) {
            cc.app.log.e("http sprite load img err:" + err);
            return;
        }
        var texture = null;
        if (cc.sys.isNative) {
            texture = image;
        } else {
            var texture2d = new cc.Texture2D();
            texture2d.initWithElement(image);
            texture2d.handleLoadedTexture();
            texture = texture2d;
        }
        texture && this.setTexture(texture);
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },


});
