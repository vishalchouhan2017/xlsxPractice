var TAG = 'function.js';
var dbConfig = require('./Environment/mongoDatabase.js');
var request = require('request');
var cheerio = require('cheerio');
var fun = require('./function.js');
var Excel = require('exceljs');
var fs = require('fs')

exports.uploadExcel = function(req, callback) {
    try {
        var fileName = req.files.file.originalFilename;
        var path = req.files.file.path;
        var XLSX = require('xlsx')
        var workbook = XLSX.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        var data = [];
        for(i=0;i<xlData.length;i++){
        data.push({
        "name":xlData[i].Num,
        "place":xlData[i].Operator,
        "money":xlData[i].Region})
        }

        var queryObj = {
            fileName : fileName
        }

        var updateObj = {
            "fileName" : fileName,
           "data" : data
        }

        var db = dbConfig.mongoDbConn;
        var dbColl = db.collection('employeeData');
        dbColl.update(queryObj,{ $set : updateObj},{ upsert : true },
            function(err, result){
             if (err) {
                resJson = {
                 "http_code": 500,
                 "message": "Error updating sessionId."
               };
               callback(true,resJson);
             }
             else {
                fs.unlinkSync(path);

                resJson = {
                   "http_code": 200,
                   "message": "Employee details uploaded successfully.",
                   "fileName":fileName
                 };
                 callback(false,resJson);
                }
           });
     } catch (e) {
       console.log(e);
        resJson = {
            "http_code": "500",
            "message": "Error while uploading data"
        };
        return callback(e, resJson);
    }
}

exports.downloadData = function(req, callback) {
    try {
        var db = dbConfig.mongoDbConn;
        var dbColl = db.collection('employeeData');
        var queryObj = {
            fileName : req.body.fileName
        }
        dbColl.findOne(queryObj,function(err, result){
             if (err) {
                resJson = {
                 "http_code": 500,
                 "message": "Error while fatching employee data."
               };
               callback(true,resJson);
             }
             else if(result != null){
                resJson = {
                    "http_code": 200,
                    "message": result
                  };
                  callback(false,resJson);
             }else{
                resJson = {
                    "http_code": 404,
                    "message": "Data Not Found"
                  };
                  callback(false,resJson);
             }
           });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error while uploading data"
        };
        return callback(e, resJson);
    }
}

exports.deleteData = function(req, callback) {
    try {
        var db = dbConfig.mongoDbConn;
        var dbColl = db.collection('employeeData');
        var queryObj = {
            fileName : req.body.fileName
        }
        dbColl.remove(queryObj,function(err, result){
             if (err) {
                resJson = {
                 "http_code": 500,
                 "message": "Error while fatching employee data."
               };
               callback(true,resJson);
             }
             else { resJson = {
                    "http_code": 200,
                    "message": "Data Deleted"
                  };
                  callback(false,resJson);
             }
           });
    } catch (e) {
        resJson = {
            "http_code": "500",
            "message": "Error while Deleting data"
        };
        return callback(e, resJson);
    }
}
