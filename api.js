var express = require('express');
var app = express();
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: 'docs' });

var fun = require('./function.js');

app.post('/uploadExcel',multipartMiddleware, function(req, res) {
    var callback = function(err, regres) {
        res.statusCode = regres.http_code;
        res.json(regres);
    };
    fun.uploadExcel(req, callback);
});

app.post('/downloadData', function(req, res) {
    var callback = function(err, regres) {
        res.statusCode = regres.http_code;
        res.json(regres);
    };
    fun.downloadData(req, callback);
});

app.post('/deleteData', function(req, res) {
    var callback = function(err, regres) {
        res.statusCode = regres.http_code;
        res.json(regres);
    };
    fun.deleteData(req, callback);
});

module.exports = app;