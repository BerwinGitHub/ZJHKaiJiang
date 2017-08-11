/**
 * Created by t_Ber on 2017/8/9.
 */

(function () {
    /**
     * Shader 滤镜
     * @type {{DEFAULT_VERTEX_SHADER: string, GRAY_SCALE_FRAGMENT_SHADER: string, SEPIA_FRAGMENT_SHADER: string, SHADER_POSITION_GRAY_FRAG: string, SHADER_POSITION_GRAY_VERT: string, DEFAULT_VERTEX_VSH: string, FSH_WAVE: string, BLUR_FSH: string, MOTION_BLUR: string, CIRCLE_SHED_BLUR: string, programs: {}, _getProgram: _getProgram, grayScale: grayScale, sepia: sepia, wave: wave, blur: blur, motionBlur: motionBlur, shedBlur: shedBlur}}
     */
    var Filter = {

        DEFAULT_VERTEX_SHADER: "\n"
        + "attribute vec4 a_position; \n"
        + "attribute vec2 a_texCoord; \n"
        + "varying mediump vec2 v_texCoord; \n"
        + "void main() \n"
        + "{ \n"
        + "    gl_Position = CC_PMatrix * a_position;  \n"
        + "    v_texCoord = a_texCoord; \n"
        + "}",
        GRAY_SCALE_FRAGMENT_SHADER: "\n"
        + "varying vec2 v_texCoord;   \n"
        + "uniform sampler2D tex0; \n"
        + "void main() \n"
        + "{  \n"
        + "    vec4 texColor = texture2D(tex0, v_texCoord);  \n"
        + "    float gray = texColor.r * 0.299 + texColor.g * 0.587 + texColor.b * 0.114; \n"
        + "    gl_FragColor = vec4(gray, gray, gray, texColor.a);  \n"
        + "}",
        SEPIA_FRAGMENT_SHADER: "\n"
        + "varying vec2 v_texCoord;   \n"
        + "uniform sampler2D tex0; \n"
        + "uniform float u_degree; \n"
        + "void main() \n"
        + "{  \n"
        + "    vec4 texColor = texture2D(tex0, v_texCoord);  \n"
        + "    float r = texColor.r * 0.393 + texColor.g * 0.769 + texColor.b * 0.189; \n"
        + "    float g = texColor.r * 0.349 + texColor.g * 0.686 + texColor.b * 0.168; \n"
        + "    float b = texColor.r * 0.272 + texColor.g * 0.534 + texColor.b * 0.131; \n"
        + "    gl_FragColor = mix(texColor, vec4(r, g, b, texColor.a), u_degree);  \n"
        + "}",
        SHADER_POSITION_GRAY_FRAG: "\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + ((typeof document !== 'undefined') ? "uniform sampler2D CC_Texture0;\n" : "")
        + "void main()\n"
        + "{\n"
        + "    vec4 v_orColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n"
        + "    float gray = dot(v_orColor.rgb, vec3(0.299, 0.587, 0.114));\n"
        + "    gl_FragColor = vec4(gray, gray, gray, v_orColor.a);\n"
        + "}\n",
        SHADER_POSITION_GRAY_VERT: "\n"
        + "attribute vec4 a_position;\n"
        + "attribute vec2 a_texCoord;\n"
        + "attribute vec4 a_color;\n"
        + "\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + "\n"
        + "void main()\n"
        + "{\n"
        + "gl_Position = " + ((typeof document !== 'undefined') ? "(CC_PMatrix * CC_MVMatrix)" : "CC_PMatrix") + " * a_position;\n"
        + "v_fragmentColor = a_color;\n"
        + "v_texCoord = a_texCoord;\n"
        + "}",
        DEFAULT_VERTEX_VSH: "\n"
        + "attribute vec4 a_position;\n"
        + "attribute vec2 a_texCoord;\n"
        + "attribute vec4 a_color;\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + "void main()\n"
        + "\n{\n"
        + "   gl_Position = CC_PMatrix * a_position;\n"
        + "   v_fragmentColor = a_color;\n"
        + "   v_texCoord = a_texCoord;\n"
        + "}",
        FSH_WAVE: "\n"
        + "varying vec2 v_texCoord;\n"
        + "void main()\n"
        + "\n{\n"
        + "   vec2 coord = v_texCoord;\n"
        + "   coord.x += (sin(coord.y * 10.0 + CC_Time[1] * 10.0) / 30.0);\n"
        + "   gl_FragColor = texture2D(CC_Texture0, coord);\n"
        + "}",
        BLUR_FSH: ""
        + "#ifdef GL_ES\n"
        + "precision mediump float;\n"
        + "#endif\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + "uniform vec2 blurSize;\n"
        + "void main() {\n"
        + "    vec4 sum = vec4(0.0);\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord - 0.0004 * blurSize) * 0.05;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord - 0.0003 * blurSize) * 0.09;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord - 0.0002 * blurSize) * 0.12;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord - 0.0001 * blurSize) * 0.15;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord) * 0.16;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord + 0.0001 * blurSize) * 0.15;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord + 0.0002 * blurSize) * 0.12;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord + 0.0003 * blurSize) * 0.09;\n"
        + "    sum += texture2D(CC_Texture0, v_texCoord + 0.0004 * blurSize) * 0.05;\n"
        + "    gl_FragColor = sum * v_fragmentColor;\n"
        + "}",
        MOTION_BLUR: "\n"
        + "#ifdef GL_ES\n"
        + "precision mediump float;\n"
        + "#endif\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + "uniform vec2 v_ins;\n"
        + "uniform int i_num;\n"
        + "uniform float f_weight;\n"
        + "void main()\n"
        + "\n{\n"
        + "    vec2 v = v_texCoord;\n"
        + "    vec4 c = texture2D(CC_Texture0, v) * f_weight;\n"
        + "    int num = i_num;\n"
        + "    for (int i = 0; i < 100; i++)\n"
        + "    {\n"
        + "        v += v_ins;\n"
        + "        c += texture2D(CC_Texture0, v) * f_weight;\n"
        + "        if(--num <= 0) break;\n"
        + "    }\n"
        + "    gl_FragColor = c;\n"
        + "}",
        CIRCLE_SHED_BLUR: ""
        + "#ifdef GL_ES\n"
        + "precision lowp float;\n"
        + "#endif\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + "uniform vec2 v_center; \n"
        + "uniform float f_ins;\n"
        + "uniform mediump float f_mlen;\n"
        + "void main() \n"
        + "{ \n"
        + "    vec2 os = v_center - v_texCoord;\n"
        + "    float dis = max(sqrt(os.x * os.x + os.y * os.y), f_ins * 0.1);\n"
        + "    mediump float num = floor(dis * f_mlen) + 1.;\n"
        + "    float rate = 1. / num;\n"
        + "    vec2 st = vec2(f_ins * os.x / dis, f_ins * os.y / dis);\n"
        + "    vec4 sc = texture2D(CC_Texture0, v_texCoord);\n"
        + "    vec4 c = vec4(0., 0., 0., 0.); \n"
        + "    os = v_texCoord;\n"
        + "    for (int i = 0; i < 100; i++)  \n"
        + "    { \n"
        + "        os += st; \n"
        + "        c += texture2D(CC_Texture0, os) * rate; \n"
        + "        num -= 1.; \n"
        + "        if(num <= 0.0) break; \n"
        + "    }\n"
        + "    gl_FragColor.rgb = c.rgb + sc.rgb * rate;\n"
        + "    gl_FragColor.a = sc.a; \n"
        + "}",

        programs: {},

        /**
         * 得到Program
         * @param name  名字
         * @param vsh   vsh内容
         * @param fsh   fsh内容
         * @returns {*}
         * @private
         */
        _getProgram: function (name, vsh, fsh) {
            var program = Filter.programs[name];
            if (!program) {
                program = new cc.GLProgram();
                if (!program.initWithString(vsh, fsh)) {
                    console.log("GLProgram initWithString error.");
                    return null;
                }
                program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
                program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                program.link();
                program.updateUniforms();
                if (cc.sys.isNative) {
                    program.retain();
                } else {
                    program.use();
                }
                Filter.programs[name] = program;
            }
            return program;
        },

        /**
         * 灰度
         * @param sprite
         */
        grayScale: function (sprite) {
            var program;
            if (typeof document !== 'undefined') {
                program = this._getProgram("grayScale", Filter.DEFAULT_VERTEX_SHADER, Filter.GRAY_SCALE_FRAGMENT_SHADER);
            } else {
                program = this._getProgram("grayScale", Filter.SHADER_POSITION_GRAY_VERT, Filter.SHADER_POSITION_GRAY_FRAG);
            }
            if (program) {
                if (cc.sys.isNative) {
                    var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
                    sprite.setGLProgramState(glProgram_state);
                } else {
                    gl.useProgram(program.getProgram());
                    sprite.shaderProgram = program;
                }
            }
        },

        /**
         * 造旧
         * @param sprite
         * @param degree 旧的程度 0~1
         */
        sepia: function (sprite, degree) {
            var program = this._getProgram("sepia" + degree, Filter.DEFAULT_VERTEX_SHADER, Filter.SEPIA_FRAGMENT_SHADER);
            if (program) {
                if (cc.sys.isNative) {
                    var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
                    glProgram_state.setUniformFloat("u_degree", degree);
                    glProgram_state.setUniformTexture("tex0", sprite.getTexture());
                    sprite.setGLProgramState(glProgram_state);
                } else {
                    var degreeLocation = program.getUniformLocationForName("u_degree");
                    program.setUniformLocationWith1f(degreeLocation, degree);
                    gl.useProgram(program.getProgram());
                    sprite.shaderProgram = program;
                }
            }
        },

        /**
         * 波纹
         * @param sprite
         */
        wave: function (sprite) {
            var program = this._getProgram("wave", Filter.DEFAULT_VERTEX_VSH, Filter.FSH_WAVE);
            if (program) {
                if (cc.sys.isNative) {
                    var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
                    sprite.setGLProgramState(glProgram_state);
                } else {
                    gl.useProgram(program.getProgram());
                    sprite.shaderProgram = program;
                }
            }
        },

        /**
         * 模糊
         * @param sprite
         * @param blurSize
         */
        blur: function (sprite, blurSize) {
            var name = "blur" + blurSize.x + blurSize.y;
            var program = this._getProgram(name, Filter.DEFAULT_VERTEX_VSH, Filter.BLUR_FSH);
            if (program) {
                if (cc.sys.isNative) {
                    var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
                    glProgram_state.setUniformVec2("blurSize", {x: blurSize.x, y: blurSize.y});
                    sprite.setGLProgramState(glProgram_state);
                } else {
                    var u_blurSize = program.getUniformLocationForName("blurSize");
                    program.setUniformLocationWith2f(u_blurSize, blurSize.x, blurSize.y);
                    gl.useProgram(program.getProgram());
                    sprite.shaderProgram = program;
                }
            }
        },

        /**
         * 运动模糊
         */
        /**
         *
         * @param sprite
         * @param sampling 采样的次数 15
         * @param weight 权重 0.0625
         * @param ins   每次采样时纹理坐标的偏移量(-0.02, 0)
         */
        motionBlur: function (sprite, sampling, weight, ins) {
            var name = "motionBlur" + sampling + weight + ins.x + ins.y;
            var program = this._getProgram(name, Filter.DEFAULT_VERTEX_VSH, Filter.MOTION_BLUR);
            if (program) {
                if (cc.sys.isNative) {
                    var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
                    glProgram_state.setUniformInt("i_num", sampling);
                    glProgram_state.setUniformFloat("f_weight", weight);
                    glProgram_state.setUniformVec2("v_ins", {x: ins.x, y: ins.y});
                    sprite.setGLProgramState(glProgram_state);
                } else {
                    program.setUniformsForBuiltins();
                    var i_num = program.getUniformLocationForName("i_num"); // 采样次数
                    var f_weight = program.getUniformLocationForName("f_weight"); // 权重
                    var v_ins = program.getUniformLocationForName("v_ins"); // 每次采样时纹理坐标的偏移量(-0.02, 0)
                    program.setUniformLocationWith1i("i_num", sampling);
                    program.setUniformLocationWith1f("f_weight", weight);
                    program.setUniformLocationWith2f("v_ins", ins.x, ins.y);

                    gl.useProgram(program.getProgram());
                    sprite.shaderProgram = program;
                }
            }
        },

        /**
         * 放射模糊
         * @param sprite
         * @param center    放射的中心点
         * @param ins       每次采样的值1.0/1136.0
         * @param melen     64.0
         */
        shedBlur: function (sprite, center, ins, melen) {
            var name = "shedBlur" + center.x + center.y + ins + melen;
            var program = this._getProgram(name, Filter.DEFAULT_VERTEX_VSH, Filter.CIRCLE_SHED_BLUR);
            if (program) {
                if (cc.sys.isNative) {
                    // + "uniform vec2 v_center; \n"
                    // + "uniform float f_ins;\n"
                    // + "uniform mediump float f_mlen;\n"
                    var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
                    glProgram_state.setUniformVec2("v_center", {x: center.x, y: center.y});
                    glProgram_state.setUniformFloat("f_ins", ins);
                    glProgram_state.setUniformFloat("f_mlen", melen);
                    sprite.setGLProgramState(glProgram_state);
                } else {
                    program.setUniformsForBuiltins();
                    var v_center = program.getUniformLocationForName("v_center"); // 采样次数
                    var f_ins = program.getUniformLocationForName("f_ins"); // 权重
                    var f_mlen = program.getUniformLocationForName("f_mlen"); // 每次采样时纹理坐标的偏移量(-0.02, 0)
                    program.setUniformLocationWith2f(v_center, center.x, center.y);
                    program.setUniformLocationWith1f(f_ins, ins);
                    program.setUniformLocationWith1f(f_mlen, melen);

                    gl.useProgram(program.getProgram());
                    sprite.shaderProgram = program;
                }
            }
        },
    };

    cc.Filter = Filter;
})();
