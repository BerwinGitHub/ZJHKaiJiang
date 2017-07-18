/**
 * Created by Berwin on 2017/3/25.
 */
var fs = require("fs");
var PATH = require('path')
var crypto = require('crypto');

/**
 * 递归遍历文件夹
 * @param path
 * @param fileHandler
 * @param deep
 * @param regular 正则表达式/.*(.csv|.xlsx)$/
 */
function recursiveFiles(path, fileHandler, regular = null, deep = 0) {
    var dirs = fs.readdirSync(path);
    for (var i = 0; i < dirs.length; i++) {
        var name = dirs[i];
        var tmpPath = path + '/' + name;
        if (isDirectory(tmpPath)) {
            recursiveFiles(tmpPath, fileHandler, regular, ++deep);
        } else if (!regular) {
            var arr = name.split(".");
            fileHandler(path, arr[0], arr[1]);
        } else if (regular && regular.test(name)) {
            var arr = name.split(".");
            fileHandler(path, arr[0], arr[1]);
        }
    }
}

/**
 * 路径是否存在
 * @param path
 * @returns {*}
 */
function exists(path) {
    return fs.existsSync(path) || fs.existsSync(path);
}

/**
 * 是否是文件
 * @param path
 * @returns {*}
 */
function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}

/**
 * 是否是文件夹
 * @param path
 * @returns {*}
 */
function isDirectory(path) {
    return exists(path) && fs.statSync(path).isDirectory();
}

/**
 * 递归创建目录 同步方法
 * @param dirname
 * @returns {boolean}
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(PATH.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

/**
 * 清空前面的文件再写入
 * flag传值，r代表读取文件，w代表写文件，a代表追加。
 * @param filePath
 * @param txt
 * @param callback function (err) {}
 */
function writeToFile(filePath, data, callback) {
    var path = PATH.dirname(filePath)
    if (!exists(path)) {
        console.log("创建目录：" + path);
        mkdirsSync(path);
    }
    fs.writeFile(filePath, data, {'flag': 'w'}, 'utf-8', callback);
}

/**
 * 读取文件
 * @param filePath
 * @param ecode
 * @returns {*}
 */
function readFromFile(filePath, ecode = "utf-8") {
    if (!exists(filePath))
        return null;
    var data = fs.readFileSync(filePath, ecode);
    return data;
}

/**
 * 创建一个文件
 * @param filePath
 * @param callback
 */
function createFile(filePath, callback) {
    writeToFile(filePath, "", callback);
}

/**
 * 得到文件的md5值
 * @param file
 * @param callback
 */
function getFileMD5(file, callback) {
    try {
        // 这不用异步的话，有可能到导致读取数据为空数据(d41d8cd98f00b204e9800998ecf8427e)
        fs.readFile(file, function (err, buffer) {
            var fsHash = crypto.createHash('md5');
            fsHash.update(buffer);
            var md5 = fsHash.digest('hex');
            // console.log(file, md5);
            // console.log(buffer);
            callback(file, md5);
        });
    } catch (err) {
        if (err)
            console.log(err);
    }
}

function copyFile(src, dst) {
    var path = PATH.dirname(dst)
    if (!exists(path)) {
        console.log("Create Folder\t\t=>\t\t" + path);
        mkdirsSync(path);
    }
    var readable = fs.createReadStream(src);
    var writable = fs.createWriteStream(dst);
    readable.pipe(writable);
}

// /*
//  * 复制目录中的所有文件包括子目录
//  * @param{ String } 需要复制的目录
//  * @param{ String } 复制到指定的目录
//  */
// var copyFiles = function (src, dst) {
//     // 读取目录中的所有文件/目录
//     fs.readdir(src, function (err, paths) {
//         if (err)
//             throw err;
//         paths.forEach(function (path) {
//             var _src = src + '/' + path,
//                 _dst = dst + '/' + path,
//                 readable, writable;
//             stat(_src, function (err, st) {
//                 if (err) {
//                     throw err;
//                 }
//                 // 判断是否为文件
//                 if (st.isFile()) {
//                     // 创建读取流
//                     readable = fs.createReadStream(_src);
//                     // 创建写入流
//                     writable = fs.createWriteStream(_dst);
//                     // 通过管道来传输流
//                     readable.pipe(writable);
//                 }
//                 // 如果是目录则递归调用自身
//                 else if (st.isDirectory()) {
//                     exists(_src, _dst, copy);
//                 }
//             });
//         });
//     });
// };

module.exports.recursiveFiles = recursiveFiles;
module.exports.isDirectory = isDirectory;
module.exports.isFile = isFile;
module.exports.exists = exists;
module.exports.writeToFile = writeToFile;
module.exports.createFile = createFile;
module.exports.getFileMD5 = getFileMD5;
module.exports.readFromFile = readFromFile;
module.exports.mkdirsSync = mkdirsSync;
module.exports.copyFile = copyFile;
