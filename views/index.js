var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');

// /* GET home page. */
app.get('/', function(req, res, next) {
    if(req.url === "/"){
       fs.readFile('./views/home.html',"UTF-8", function(error, content) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
})
// });
module.exports = app;
