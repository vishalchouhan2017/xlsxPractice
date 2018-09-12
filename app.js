var TAG = 'app.js';

var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true
}));

var dbConfig = require('./Environment/mongoDatabase.js');
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

var api = require('./api.js');
app.use('/api', api);



///////////
dbConfig.createMongoConn(function(error) {
    if (error) {
        console.log('Unable to connect to the mongoDB server. Error:', error);
    } else {

        app.listen(8083);
        console.log('Listening on port 8083');
    }

})