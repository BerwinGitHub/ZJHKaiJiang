/**
 * 文件服务器，用于本地热更新代码用
 * Created by Berwin on 2017/3/26.
 */

var cfgs = require("./configs");
var express = require("express")
var url = require("url")

var app = express()
app.use((req, res, next) => {
    var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
    var req_path = url.parse(req.url).path;
    console.log(ip + " => " + req_path);
    next();
});
app.use(express.static(cfgs.common.SERVER_PATH));
app.listen(cfgs.server.PORT, () => {
    console.log("热更新服务器在端口:(" + cfgs.server.PORT + ")监听");
})
