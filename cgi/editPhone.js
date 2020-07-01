const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const generatorIdModule = require('./modules/logger.js');
const { json } = require('body-parser');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = path.join(__dirname, "../data", "phone.json");
    var idGeneratorFileLocation = path.join(__dirname, "../cgi", "idGenerator.txt");
    try {
        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
        if (infoFromURL.editType == 'edit') {
            console.log("EDIT PHONE"); //
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    var currentStudentLocationOnArray = -1;
                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].student_uid == parseInt(infoFromURL.currentStudentUid)) {
                            for (var j = 0; j < dataArray[i].phones.length; j++) {
                                if (dataArray[i].phones[j].uid == infoFromURL.editedPhoneNumberUid) {
                                    dataArray[i].phones[j].phone = infoFromURL.editedPhoneNumberValue;
                                    currentStudentLocationOnArray = i;
                                }
                            }
                        }
                    }

                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                    res.write(JSON.stringify(dataArray[currentStudentLocationOnArray]));
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else if (infoFromURL.editType == 'add') {
            console.log('ADD PHONE'); //
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    var dataArray = JSON.parse(data);
                    var phoneObject = null;
                    var newPhoneUid = generatorIdModule.generatorInfo();
                    var newPhoneNumber = JSON.parse(infoFromURL.addNew);
                    fs.writeFileSync(idGeneratorFileLocation, newPhoneUid);
                    var i = 0;
                    for (i; i < dataArray.length; i++) {
                        if (dataArray[i].student_uid == infoFromURL.studentUid) { // have an object
                            phoneObject = dataArray[i];
                            break;
                        }
                    }
                    if (phoneObject == null) { // create and add object to 'dataArray'
                        console.log("made 1");
                        phoneObject = [{ "student_uid": infoFromURL.studentUid, "phones": [{ "uid": newPhoneUid, "phone": newPhoneNumber }] }];
                        dataArray.push(phoneObject);
                        console.log("made 2");
                    } else { // object exists: add new phone to object
                        console.log("made 3");
                        var newPhoneObj = { "uid": newPhoneUid, "phone": newPhoneNumber }
                        phoneObject.phones.push(newPhoneObj);
                        dataArray[i] = phoneObject;
                        console.log("made 4");
                    }
                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                    res.write(JSON.stringify(dataArray[i]));
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else if (infoFromURL.editType == 'del') {
            console.log("DELETE PHONE"); //
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    var dataArray = JSON.parse(data);
                    var currentUserPhoneLocationInArray;
                    for (var i = 0; i < dataArray.length; i++) {
                        var currentStudentUid = parseInt(infoFromURL.studentUid);
                        var currentStudentUidFromDataArray = dataArray[i].student_uid;
                        if (currentStudentUid == currentStudentUidFromDataArray) {
                            var phoneNumberLocation = 0;
                            for (let j = 0; j < dataArray[i].phones.length; j++) {
                                if (infoFromURL.mobileNumberUid == dataArray[i].phones[j].uid) {
                                    phoneNumberLocation = j;
                                }
                            }
                            dataArray[i].phones.splice(phoneNumberLocation, 1);
                            currentUserPhoneLocationInArray = i;
                        }
                    }
                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                    res.write(JSON.stringify(dataArray[currentUserPhoneLocationInArray]));
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else {
            console.log("no info on where to go was given! error!");
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8088);
console.log('Server running at http://127.0.0.1:8085/'); //
