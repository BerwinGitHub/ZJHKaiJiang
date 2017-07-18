/**
 * Created by Berwin on 2017/4/19.
 */
var fs = require("fs");
var path = require('path');
var cfgs = require("./configs");
var file = require("./core/files/file");
const lineReader = require('./core/lineReader');

/**
 *
 */
var SRC = path.resolve(__dirname, cfgs.packages.SRC);
(function (callback) {
    var $import = {};
    var $package = {};
    var $classes = {};
    var $groups = {};
    recursiveFiles(SRC, $import, $package, $classes, $groups);
    var saves = [$classes, $import, $package, $groups];
    var header = ["var $classes = ", "var $import = ", "var $package = ", "var $groups = "];
    var footer = [";\r\n", ";\r\n", ";\r\n", ";\r\n"];
    var content = cfgs.common.JSON_FILE_NOTE;
    for (var i = 0; i < saves.length; i++) {
        var obj = saves[i];
        var h = header[i];
        if (cfgs.packages.FORMAT_JSON) {
            content += (h + JSON.stringify(obj, null, 4)) + footer[i];
        } else {
            content += (h + JSON.stringify(obj)) + ";";
        }
    }
    content += "\r\n" + "var $req = $import;";
    file.writeToFile(path.resolve(__dirname, cfgs.packages.DATA_FILE), content, () => {
        console.log("packageData.js保存成功");
    })
})();

/**
 * 递归遍历文件夹
 * @param src
 * @param callback
 */
function recursiveFiles(src, $import, $package, $classes, $groups) {
    var hasClass = false;
    var dirs = fs.readdirSync(src);
    for (var i = 0; i < dirs.length; i++) {
        var name = dirs[i];
        var p = src + '/' + name;
        var child = {};
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
            if (recursiveFiles(p, child, $package, $classes, $groups)) {
                $import[path.basename(p)] = child;
                hasClass = true;
            } else {
                delete $import[path.basename(p)];
            }
        } else if (fs.existsSync(p) && !isExcludeFile(p)) {
            var key = path.basename(p).replace(path.extname(p), "");
            $import[key] = child;
            if (readJsFile(p, $package, $classes, $groups, child)) {
                hasClass = true;
            } else {
                delete $import[key];
            }
        }
    }
    return hasClass;
}

function readJsFile(p, $package, $classes, $groups, child) {
    var rltFile = path.relative(SRC, p);
    var pkg = rltFile.replace(".js", "");
    pkg = pkg.replace(/\//g, ".");
    var imports = [];
    var reader = new lineReader(p);
    var line;
    var lineNum = 1;
    var hasClass = false;
    var exports = {};
    while ((line = reader.next())) {
        line = line.replace(/[\r\n]/g, ""); // 在Windows上面每行有\r或\n，在这替换掉
        line = line.replace(/(^\s*)|(\s*$)/g, ""); // 替换掉首尾的空格
        if (line.startsWith("$")) {
            if (/^\$include\(.*(\)|\);)$/.test(line)) {// import
                // 先把两边括号去掉
                var content = /^\$include\((\$import.*)(\)|\);)$/.exec(line)[1].replace(/\s+/g, "");
                ;
                var imp = content.split(",")// js语法规则只有','可行
                imports = imports.concat(imp);
            } else if (/^\$class\(\"(.*)\".*$/.test(line)) {// classes
                var clsName = /^\$class\(\"(.*)\".*$/.exec(line)[1];
                if (!isSamePkg$ClsName($classes, pkg, clsName)) {
                    hasClass = true;
                    child._pkg = pkg;
                    child._cls = clsName;
                    //
                    var meta = {
                        "file": rltFile,
                        "name": clsName,
                        "package": pkg,
                        "loaded": false,
                        "factory": null,
                        "export": {},
                        "import": [],
                        "ref": imports,
                    };
                    exports = meta.export;
                    $classes[clsName] = $classes[clsName] || [];
                    $classes[clsName].push(meta);
                } else {
                    console.log("跳过,同包名下不能有相同类(" + p + " => " + lineNum + "行 => " + clsName + ")");
                }
            } else if (/^\$public\(\"(.*)\".*$/.test(line)) { // public
                var pub = /^\$public\(\"(.*)\".*$/.exec(line)[1];
                exports[pub] = {};
            } else if(/^\$group\(.*(\)|\);)$/.test(line)){
                var name = /^\$group\(\"(.*)\".*$/.exec(line)[1];
                $groups[name] = $groups[name] || [];
                $groups[name].push(rltFile);
            }
        }
        lineNum++;
    }
    if (hasClass) {
        $package[pkg] = pkg;
    }
    return hasClass;
}

function isSamePkg$ClsName($classes, pkg, cls) {
    var classes = $classes[cls];
    if (!classes) {
        return false;
    }
    for (var i = 0; i < classes.length; i++) {
        if (classes[i]["package"] === pkg) {
            return true;
        }
    }
    return false;
}

/**
 * 是否是排除中的文件
 * @param file
 * @returns {boolean}
 */
function isExcludeFile(file) {
    var excludes = cfgs.packages.FILTER_EXCLUDE_SRC;
    for (var j = 0; j < excludes.length; j++) {
        if (excludes[j].test(file)) {
            return true;
        }
    }
    return false;
}