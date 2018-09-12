var TAG = 'mongoDatabase.js';
var mongoClient = require('mongodb').MongoClient;
var async = require('async');

exports.createMongoConn = function(callback) {
    async.parallel([
            function(asyncCallback) {
                mongoClient.connect('mongodb://127.0.0.1:27017/myDB', function(err, database) {
                    if (err) {
                        asyncCallback(err);
                    } else {
                        console.log('Connection established to: ', 'mongodb://127.0.0.1:27017/myDB');
                        // console.log(database);
                        exports.mongoDbConn = database;
                        asyncCallback(false);
                    }
                });
            },
        ],
        function(err, results) {
            if (err) {
                console.log('Error connecting to DB. Err : \n' + err.stack);
            } else {
                console.log('DB connection successfull.');
                callback(false);
            }
        });
}