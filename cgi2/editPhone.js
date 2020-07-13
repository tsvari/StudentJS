const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const generatorIdModule = require('./modules/logger.js');
const mongoClientURL = "mongodb+srv://givitm:giviko2007@cluster0.ysiz8.mongodb.net/testDB?retryWrites=true&w=majority";

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = path.join(__dirname, "../data", "phone.json");
    var idGeneratorFileLocation = path.join(__dirname, "../cgi", "idGenerator.txt");
    try {
        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

        if ('editType' in infoFromURL) { //
            const { MongoClient } = require('mongodb');

            const uri = "mongodb+srv://givitm:giviko2007@cluster0.ysiz8.mongodb.net/testDB?retryWrites=true&w=majority";
            const client = new MongoClient(uri);

            async function selectStudents() {

                try {
                    // Connect to the MongoDB cluster
                    await client.connect();

                    const query = {};

                    const db = await client.db("testDB");
                    const collection = db.collection("Student");
                    const result = collection.find(query);
                    if (infoFromURL.editType == 'edit') {
                        console.log("EDIT PHONE"); //
                        if (fs.existsSync(filePathLocation)) {
                                    var dataArray = await result.toArray();
                                    var currentStudentLocationOnArray = -1;
                                    for (var i = 0; i < dataArray.length; i++) {
                                        if ('currentStudentUid' in infoFromURL) {
                                            if (dataArray[i].student_uid == parseInt(infoFromURL.currentStudentUid)) {
                                                for (var j = 0; j < dataArray[i].phones.length; j++) {
                                                    if ('editedPhoneNumberUid' in infoFromURL) {
                                                        if ('phones' in dataArray[i]) {
                                                            if ('uid' in dataArray[i].phones[j]) {
                                                                if (dataArray[i].phones[j].uid == infoFromURL.editedPhoneNumberUid) {
                                                                    if ('phone' in dataArray[i].phones[j]) {
                                                                        dataArray[i].phones[j].phone = infoFromURL.editedPhoneNumberValue;
                                                                        currentStudentLocationOnArray = i;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                                    res.write(JSON.stringify(dataArray[currentStudentLocationOnArray]));
                                    return res.end();
                        } else {
                            res.write("");
                            return res.end();
                        }
                    } else if (infoFromURL.editType == 'add') {
                        console.log('ADD PHONE'); //
                        if (fs.existsSync(filePathLocation)) {
                                    var dataArray = await result.toArray();
                                    var phoneObject = null;
                                    var newPhoneUid = generatorIdModule.generatorInfo();
                                    if ('addNew' in infoFromURL) {
                                        if ('studentUid' in infoFromURL) {
                                            var newPhoneNumber = JSON.parse(infoFromURL.addNew);
                                            fs.writeFileSync(idGeneratorFileLocation, newPhoneUid);
                                            var i = 0;
                                            for (i; i < dataArray.length; i++) {
                                                if ('student_uid' in dataArray[i]) {
                                                    if (dataArray[i].student_uid == infoFromURL.studentUid) { // have an object
                                                        phoneObject = dataArray[i];
                                                        break;
                                                    }
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
                                                if ('phones' in phoneObject) {
                                                    phoneObject.phones.push(newPhoneObj);
                                                    dataArray[i] = phoneObject;
                                                    console.log("made 4");
                                                }
                                            }
                                            fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                                            res.write(JSON.stringify(dataArray[i]));
                                            return res.end();
                                        }
                                    }
                        } else {
                            res.write("");
                            return res.end();
                        }
                    } else if (infoFromURL.editType == 'del') {
                        console.log("DELETE PHONE"); //
                        if (fs.existsSync(filePathLocation)) {
                                    var dataArray = await result.toArray();
                                    if ('studentUid' in infoFromURL) {
                                        if ('mobileNumberUid' in infoFromURL) {
                                            var currentUserPhoneLocationInArray;
                                            for (var i = 0; i < dataArray.length; i++) {
                                                if ('student_uid' in dataArray[i]) {
                                                    if ('phones' in dataArray[i]) {
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
                                                }
                                            }
                                            fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                                            res.write(JSON.stringify(dataArray[currentUserPhoneLocationInArray]));
                                            return res.end();
                                        }
                                    }
                        } else {
                            res.write("");
                            return res.end();
                        }
                    } else {
                        console.log("no info on where to go was given! error!");
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    await client.close();
                }
            }

            selectStudents().catch(console.error);

        } //
    } catch (error) {
        console.log(error); //
    }
}).listen(8088);
console.log('Server running at http://127.0.0.1:8085/'); //
