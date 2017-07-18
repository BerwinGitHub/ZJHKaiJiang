/**
 * Created by Berwin on 2017/4/17.
 */

var os = require("os");
var iconv = require("iconv-lite");
var exec = require('child_process').exec;

var execCommand = function (cmd, progress, finish) {
    var isWin = (os.platform() == "win32");
    var last;
    if (isWin)
        last = exec(cmd, {encoding: "binary"});
    else
        last = exec(cmd);

    last.stdout.on('data', function (stdout) {
        var txt = stdout;
        if (isWin)
            txt = iconv.decode(new Buffer(stdout, 'binary'), "cp936");
        progress(txt.replace(/\r|\n/ig, ""));
    });

    last.on('exit', function (data) {
        finish(data);
    });
};

module.exports.execCommand = execCommand;