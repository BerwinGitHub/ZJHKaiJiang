# tools工具脚本
configs.js,是tools下面脚本运行的配置脚本。注意修改 

## tools 依赖的nodejs模块
    npm install express --save
    npm install async --save
    npm install iconv-lite --save
    
## deploy命令
会编译js成jsc，并拷贝jsc和res文件到项目下的updateServer文件夹下面，用于热更新

    node ./tools/deploy.js

## excel 转 js
将制定目录下的excel文件解析成js拷贝到configs指定的路径

    node ./tools/excel-to-json.js

## 启动本地热更新服务器
在本地启动一个热更新服务器，并以deploy后的updateServer作为文件服务器目录

    node ./tools/server.js
    
## 编译成　*.apk | *.ipa
    node ./tools/build_apk.js
    node ./tools/build_ipa.js
    
## Server本地热更新服务器
    node ./tools/server.js