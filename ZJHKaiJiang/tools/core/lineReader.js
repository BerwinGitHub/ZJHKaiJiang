'use strict';
/**
 * Created by t_Ber on 2017/4/20.
 */
//
//  Reading file line by line synochronicaly libraries
//
//  Author: Chunfeng Yang
//  All rights reserved.
//  This software is supplied "AS IS" without any warranties and support.
//  The author assumes no responsibility or liability for the use of the software,
//  conveys no license or title under any patent, copyright, or mask work right to the product.
//  The author reserves the right to make changes in the software without notification.
//
//
//  Date: 2016-06-21
//       Remove a bug in open function
//
//  Date: 2016-09-14
//       Open the file path as constructor argument
//
//  Date: 2016-10-09
//       Adding EOF() method
//
//  http://blog.csdn.net/cocoonyang/article/details/51711039

const fs = require('fs');

module.exports = function (path) {

    this._leftOver = '';
    this._EOF = false;
    this._filename;
    this._fd = 0;
    this._bufferSize = 1024;
    this._buffer = new Buffer(this._bufferSize);

    this.open = function (thePath) {
        var self = this;
        self._filename = thePath;

        if (0 !== self._fd) {
            self.close();
        }

        try {
            self._fd = fs.openSync(self._filename, 'r');
        } catch (exception) {
            console.log('open(): ' + self._filename + ' not found.');
            self._EOF = true;
            return;
        }
        self._EOF = false;
        return;
    }

    try {
        fs.statSync(path).isFile();
        this.open(path);
    } catch (exception) {
    }

    this.EOF = function () {
        return this._EOF;
    }

    this.close = function () {
        var self = this;
        try {
            fs.closeSync(self._fd);
        } catch (exception) {
            console.log('closing file failed.');
        }
        self._EOF = true;
        self._fd = 0;
        return;
    }

    this.next = function () {
        var self = this;

        if (self._EOF) {
            return null;
        }

        var _idxStart = 0;
        var idx;
        // 每次以1024个字节读取，直到读取完毕
        if ("" === self._leftOver && (idx = self._leftOver.indexOf("\n", _idxStart)) == -1) {
            var read;
            try {
                read = fs.readSync(self._fd, self._buffer, 0, self._bufferSize, null)
            } catch (exception) {
                console.log('reading file failed.');
                self.close();
                return null;
            }

            if (read !== 0) { // 读取到还有内容
                self._leftOver += self._buffer.toString('utf8', 0, read);
            } else { // 读取结束，关闭
                self.close();
                self._EOF = true;
                self._fd = 0;
                return null;
            }
        }
        idx = self._leftOver.indexOf("\n", _idxStart);
        if (idx !== -1) {
            var line = self._leftOver.substring(_idxStart, idx);
            _idxStart = idx + 1;
            self._leftOver = self._leftOver.substring(_idxStart);
            return line === "" ? "\r" : line;
        } else if ("" != self._leftOver) {
            var line = self._leftOver;
            self._leftOver = "";
            return line === "" ? "\r" : line;
        }
    }
}