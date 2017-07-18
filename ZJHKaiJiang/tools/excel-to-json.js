/**
 * 将excel转成jsons
 * Created by Berwin on 2017/3/24.
 */
var XLSX = require("./core/js-xlsx/xlsx");
var FILE = require("./core/files/file");
var CFGS = require("./configs");
var PATH = require('path');


var srcPath = PATH.resolve(__dirname, CFGS.e2j.PATH_SRC)
var destPath = PATH.resolve(__dirname, CFGS.e2j.PATH_DES)
FILE.recursiveFiles(srcPath, (path, fileName, suffix) => {
    var path = path + "/" + fileName;
    var relativePath = path.replace(srcPath, "");
    // 1.开始解析excel
    var excelData = readXlsx(path + "." + suffix);
    // 2.转成字符串
    var excelStr;
    if (CFGS.e2j.FORMAT_JSON) {
        excelStr = JSON.stringify(excelData, null, 4);
    } else {
        excelStr = JSON.stringify(excelData);
    }
    excelStr = CFGS.common.JSON_FILE_NOTE + CFGS.e2j.PREFIX_TXT + fileName + " = " + excelStr;
    // 3.写入文件
    var jsFilePath = destPath + relativePath + ".js";
    FILE.writeToFile(jsFilePath, excelStr, (err) => {
        if (err)
            console.log(err);
    });
    console.log("xlsx to json =>: " + jsFilePath);

}, /^[^.~}].*(\.xlsx|\.csv)$/);
// [^.~}].*(\.xlsx|\.csv)

function readXlsx(file) {
    var opts = [{type: 'base64'}, {type: 'binary'}];
    var workbook = XLSX.readFile(file, opts[1]);

    // 获取 Excel 中所有表名
    var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
    var excel = {};
    // 遍历所有表
    for (var i = 0; i < sheetNames.length; i++) {
        // 根据表名获取对应某张表
        var worksheet = workbook.Sheets[sheetNames[i]];
        var jsonStr = JSON.stringify(XLSX.utils.sheet_to_json(worksheet));
        var json = parseInsertFirstRow(jsonStr);
        var changedSheetJson = removeMarkRowAndExchanged(json);
        excel[sheetNames[i]] = changedSheetJson;
    }
    return excel;
}

/**
 * 移除配置中的关键列和解析成指定数据
 * @param sheet 表的格式
 */
function removeMarkRowAndExchanged(sheet) {
    var rowInfo = CFGS.e2j.ROW_INFO;
    // 1.得到字段名字
    var fieldNames = sheet[rowInfo.ROW_FIELD_NAME];
    // 2.得到类型名字
    var typeNames = sheet[rowInfo.ROW_TYPE];
    // 3.备注行
    // var notes = sheet[rowInfo.ROW_NOTE];
    // 4.移除前三行
    var removeRows = [rowInfo.ROW_NOTE, rowInfo.ROW_FIELD_NAME, rowInfo.ROW_TYPE];
    removeRows.sort();
    for (var i = removeRows.length - 1; i >= 0; i--) {
        if (removeRows[i] != -1)
            sheet.splice(removeRows[i], 1);
    }

    var sheetData = [];
    for (var i = 0; i < sheet.length; i++) {
        var rowData = sheet[i];// { id: '0', '姓名': '唐博文', '性别': '男', '年龄': '24' }
        var item = {};
        for (var key in rowData) {// { id: '0', '姓名': '唐博文', '性别': '男', '年龄': '24' }
            var v = toType(rowData[key], typeNames[key]);
            item[fieldNames[key]] = v;
        }
        sheetData.push(item);
    }
    return sheetData;
}

/**
 * 以为该excel解析把第一列当成字段名字解析了，并且不包含第一列
 * 在这需要把第一列加上
 * @param sheetStr
 */
function parseInsertFirstRow(sheetStr) {
    var sheetJson = JSON.parse(sheetStr);
    var rowData = sheetJson[0];
    var item = {};
    for (var key in rowData) {
        item[key] = key;
    }
    sheetJson.splice(0, 0, item);
    return sheetJson;
}

/**
 * 类型转换
 * @param value
 * @param type
 * @returns {*}
 */
function toType(value, type) {
    var parses = {
        "int": function (value) {
            return parseInt(value);
        },
        "float": function (value) {
            return parseFloat(value);
        },
        "bool": function (v) {
            return (v == "true" || v == "1" || v == "TRUE");
        },
        "boolean": function (v) {
            return (v == "true" || v == "1" || v == "TRUE");
        },
        "string": function (value) {
            return value;
        },
    };
    var method = parses[type];
    if (!method)
        return value;
    return method(value);
}