/**
 * 生成jsList.js文件
 * 和resources.js文件
 * Created by Berwin on 2017/3/28.
 */
var cfgs = require("./configs");
var path = require('path');
var file = require("./core/files/file")

function generateAll(callback) {
    // // 去掉jsList.js文件的生成
    // generateRes();
    // callback();
    generateSrc(() => {
        generateRes();
        callback();
    }, false);
};

// 生成jsList 文件
function generateSrc(callback, compiled) {
    var list = [];
    var srcPath = path.resolve(__dirname, cfgs.generate.SRC_PATH);
    var removed = srcPath.replace("src", "");
    file.recursiveFiles(srcPath, (path, fileName, suffix) => {
        var path = path + "/" + fileName + "." + suffix;
        path = path.replace(removed, "");
        // 查看是否是排除的文件
        var isExcludeFile = false;
        var excludes = cfgs.generate.FILTER_EXCLUDE_SRC;
        for (var i = 0; i < excludes.length; i++) {
            var reg = excludes[i];
            if (reg.test(path)) {
                isExcludeFile = true;
                break;
            }
        }
        if (!isExcludeFile) {
            if (/^.*js$/.test(suffix) && compiled)
                path += "c";
            list.push(path);
        }
    });
    var jsonStr;
    if (cfgs.generate.FORMAT_JSON) {
        jsonStr = JSON.stringify(list, null, 4);
    } else {
        jsonStr = JSON.stringify(list);
    }
    jsonStr = cfgs.common.JSON_FILE_NOTE + "var jsList = " + jsonStr;
    var jsListFile = path.resolve(__dirname, cfgs.generate.JSLIST_PATH);
    file.writeToFile(jsListFile, jsonStr, (err) => {
        if (err)
            console.log(err);
        callback();
    });
}

function generateRes() {
    var list = {};
    var resPath = path.resolve(__dirname, cfgs.generate.RES_PATH);
    var removed = resPath + "/";
    file.recursiveFiles(resPath, (path, fileName, suffix) => {
        var path = path + "/" + fileName + "." + suffix;
        path = path.replace(removed, "");


        // 查看是否是排除的文件
        var isExcludeFile = false;
        var excludes = cfgs.generate.FILTER_EXCLUDE_RES;
        for (var i = 0; i < excludes.length; i++) {
            var reg = excludes[i];
            if (reg.test(path)) {
                isExcludeFile = true;
                break;
            }
        }
        if (!isExcludeFile) {
            var k = path.replace(/[.\/-]/g, "_"); // 将路径中的./-全部替换成_
            // 保证plist 和 png 只加载一个
            if (k.endsWith("_plist")) { // plist结束就去找是否有png
                var png = k.replace("_plist", "_png");
                if (list[png]) {// 如果存在就移除
                    delete(list[png]);
                }
                list[k] = "res/" + path;
            } else if (k.endsWith("_png")) {
                var plist = k.replace("_png", "_plist");
                if (!list[plist]) {
                    list[k] = "res/" + path;
                }
            } else {
                list[k] = "res/" + path;
            }
        }
    });
    var jsonStr;
    if (cfgs.generate.FORMAT_JSON) {
        jsonStr = JSON.stringify(list, null, 4);
    } else {
        jsonStr = JSON.stringify(list);
    }
    jsonStr = cfgs.common.JSON_FILE_NOTE + "var res = " + jsonStr + "\r\n" + "var g_resources = [];\r\n" + "for (var i in res) { \r\n\tg_resources.push(res[i]);\r\n }";
    var jsListFile = path.resolve(__dirname, cfgs.generate.RESOURCE_PATH);
    file.writeToFile(jsListFile, jsonStr, (err) => {
        if (err)
            console.log(err);
    });

}
// generateAll(null);

module.exports.generateAll = generateAll;
module.exports.generateSrc = generateSrc;

