/**
 * 部署到服务器
 * 1.先加载比较配置文件./cache/deploy-compare.js
 * 2.比对已经改动过得文件，这些文件才需要重新编译和拷贝
 * 3.编译js成jsc文件
 * 4.复制资源文件到目标文件
 * 5.生成project.mainfest文件
 * Created by Berwin on 2017/3/26.
 */
var file = require("./core/files/file")
var cfgs = require("./configs")
var path = require('path');
var async = require('async');
var generate = require('./src-res-generate');

var terminal = require("./core/terminal");

var comparePath = path.resolve(__dirname, cfgs.deploy.MANIFEST_PATH);
function main() {
    // 1.先加载比较配置文件
    if (!file.exists(comparePath)) {
        // 不存在，先创建一个
        file.writeToFile(comparePath, JSON.stringify(cfgs.deploy.MANIFEST_DEFAULT_DATA, null, 4), (err) => {
                if (err)
                    console.log("create file err => " + comparePath);
                console.log("file created => " + comparePath);
                // 文件创建成功
                start(comparePath);
            }
        );
    } else {
        start(comparePath);
    }
}

function start(comparePath) {
    // 0.先编译cocos-js framworks里面的js文件
    // compileJs(cfgs.deploy.CMD_COCOS_JS, () => {
    // 1.生成jsList和resource.js文件
    generate.generateAll(() => {
        // 2.加载project.manifest文件,并重新生成
        var data = file.readFromFile(comparePath);
        var compareData = JSON.parse(data);
        compareData.packageUrl = cfgs.deploy.MANIFEST_DEFAULT_DATA.packageUrl;
        compareData.remoteManifestUrl = cfgs.deploy.MANIFEST_DEFAULT_DATA.remoteManifestUrl;
        compareData.remoteVersionUrl = cfgs.deploy.MANIFEST_DEFAULT_DATA.remoteVersionUrl;
        compareData.engineVersion = cfgs.deploy.MANIFEST_DEFAULT_DATA.engineVersion;
        // 4.编译js文件 到发布的路径
        compileJs(cfgs.deploy.JS_CMD, () => {
            // 5.开始拷贝res下面的资源
            copyResFiles();
            // 生成project.manifest文件
            generateManifest(compareData, () => {
                // 生成version.manifest
                generateVersionManifest(compareData);
            });
            // 生成jsList.js文件
            // generate.generateSrc(() => {
            // }, false);
        });
    });
    // });
}

function compileJs(cmd, callback) {
    console.log("JSCompile <= Start.");
    terminal.execCommand(cmd, (txt) => {
        console.log("JSCompile <= " + txt);
    }, (data) => {
        console.log("JSCompile <= End.");
        callback();
    });
}

function copyResFiles() {
    var resPath = path.resolve(__dirname, cfgs.deploy.RES_PATH);
    var destRoot = path.resolve(__dirname, "." + cfgs.deploy.DEPLOY_PATH);//../UpdateServer
    var remove = path.resolve(__dirname, "../");
    file.recursiveFiles(resPath, (path, fileName, suffix) => {
        var path = path + "/" + fileName + "." + suffix;
        var relativePath = path.replace(remove, destRoot);
        file.copyFile(path, relativePath);
    });
}

function generateManifest(compareData, callback) {
    var assets = compareData.assets;
    var RootPath = path.resolve(__dirname, "." + cfgs.deploy.DEPLOY_PATH);//../UpdateServer;
    var parallelParam = [];
    file.recursiveFiles(RootPath, (path, fileName, suffix) => {
        var path = path + "/" + fileName + "." + suffix;
        var extraname = "." + suffix;
        if (!cfgs.deploy.EXCLUDE_FILES[extraname]) {
            parallelParam.push((callback) => {
                file.getFileMD5(path, (file, md5) => {
                    callback(null, {file: file, md5: md5});
                });
            });
        }
    }, 0, /^[^.~].*$/);
    _file = file;
    async.parallel(parallelParam, (err, data) => {
        if (err)
            console.log(err);
        var updated = false;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var file = item.file.replace(RootPath + "/", "");
            // console.log(file + "\t:\t" + item.md5);
            // 再去比对是否存在这个
            var u = updateManifest(file, item.md5, assets);
            updated = updated ? true : u;
        }
        if (updated) {
            var bigVersion = compareData.version.substr(0, compareData.version.lastIndexOf(".") + 1);
            compareData.version = bigVersion + getTimeMillis();
        }
        // 保存project.manifest文件
        var manifestStr;
        if (cfgs.common.FORMAT_JSON) {
            manifestStr = JSON.stringify(compareData, null, 4);
        } else {
            manifestStr = JSON.stringify(compareData);
        }
        // 保存生成的数据
        _file.writeToFile(comparePath, manifestStr, (err) => {
            if (err)
                console.log(err);
            console.log("[ Saved] <= " + comparePath);
            var deployPath = path.resolve(__dirname, "." + cfgs.deploy.DEPLOY_PATH + "/res/project.manifest");//../UpdateServer
            _file.writeToFile(deployPath, manifestStr, (err) => {
                if (err)
                    console.log(err);
                console.log("[ Saved] <= " + deployPath);
                callback();
            });
        });
    });
}

function generateVersionManifest(compareData) {
    var obj = cfgs.deploy.VERSION_TEMPLATE;
    obj.remoteVersionUrl = cfgs.deploy.VERSION_TEMPLATE.remoteVersionUrl;
    obj.packageUrl = compareData.packageUrl;
    obj.version = compareData.version;

    // compareData["remoteVersionUrl"] = ;
    // 保存生成的数据
    var manifestStr;
    if (cfgs.common.FORMAT_JSON) {
        manifestStr = JSON.stringify(obj, null, 4);
    } else {
        manifestStr = JSON.stringify(obj);
    }
    var p = path.resolve(__dirname, cfgs.deploy.VERSION_MANIFEST_PATH);
    _file.writeToFile(p, manifestStr, (err) => {
        if (err)
            console.log(err);
        console.log("[ Saved] <= " + p);
        var deployPath = path.resolve(__dirname, "." + cfgs.deploy.DEPLOY_PATH + "/res/version.manifest");//../UpdateServer
        _file.writeToFile(deployPath, manifestStr, (err) => {
            if (err)
                console.log(err);
            console.log("[ Saved] <= " + deployPath);
        });
    });
}

function updateManifest(name, md5, assets) {
    var update = false;
    var findItem = null;
    for (var key in assets) {
        if (key == name) {
            findItem = assets[key];
            break;
        }
    }
    if (findItem) {
        if (findItem["md5"] != md5) {
            update = true;
            findItem["md5"] = md5;
            console.log("[modify] <= " + name);
        }
    } else { // 新增
        update = true;
        var item = {md5: md5, compressed: false};
        eval("assets[\"" + name + "\"]=item");
        console.log("[ added] <= " + name);
    }
    return update;
}

/**
 * 得到毫秒级时间
 * @returns {number}
 */
function getTimeMillis() {
    var nowDate = new Date();
    return nowDate.getTime();
}

main();
