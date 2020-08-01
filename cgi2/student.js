const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();
const path = require('path');
const url = require('url');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://givitm:giviko2007@cluster0.ysiz8.mongodb.net/testDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);
// const client = new MongoClient(uri, { useNewUrlParser: true });
const assert = require('assert');

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

async function selectStudents(query) {
    await client.connect();
    const db = client.db("testDB");
    const collection = db.collection("Student");
    const result = collection.find(query);
    const studentArray = await result.toArray();
    return studentArray;
}

async function selectStudentByUid(uid) {
    //
}

app.get('/', function (req, res) {
    try {
        var infoFromURL = url.parse(req.url, true).query;

        if (infoFromURL.infoType == "form") { // &editType= add or edit
            var indexFilePath = path.join(__dirname, "../www2", "studentForm.htm");
            fs.readFile(indexFilePath, 'utf-8', function (err, data) {
                var query = {};
                (async () => selectStudents(query).then(resultStudentArray => {
                    var fileInfo = data.toString();
                    var replacedRandom = fileInfo.replace("@editType", JSON.stringify(infoFromURL.editType));
                    replacedRandom = replacedRandom.toString();
                    if (infoFromURL.editType == "edit") {
                        var reg = new RegExp("@uidValue", 'g');
                        // var uidValueToInt = parseInt(infoFromURL.uid);
                        // var replaced = replacedRandom.replace("@uidValue", infoFromURL.studentUid);
                        var replaced = replacedRandom.replace(reg, infoFromURL.uid);
                    }
                    res.write(replaced);
                    return res.end();
                }))();
            });
        } else if (infoFromURL.infoType == "data") { // ?infoType=data&uid=all
            // TODO: check uid on existant. if not retun nothing
            var query = {};
            if (infoFromURL.uid == "all") {
                console.log("select"); //

                // res.writeHead(200, { 'Content-Type': 'text/html' });
                res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
            } else { // ?infoType=data&uid=5
                // TODO: parse infoFromURL.uid to int and use
                // to return single student
                // { uid: index }
                // implement and use  selectStudentByUid(uid)

                var uidParse = parseInt(infoFromURL.uid);
                query = { uid: uidParse };
            }
            (async () => selectStudents(query).then(resultStudentArray => {
                res.write(JSON.stringify(resultStudentArray));
                return res.end();
            }))();
        } else {
            var indexFilePath = path.join(__dirname, "../www2", "student.htm");
            fs.access(indexFilePath, fs.F_OK, (err) => {
                if (err) {
                    console.error(err); //
                    res.send("Error to finding index file");
                    return;
                }
                res.sendFile(indexFilePath);
            })
        }
    } catch (e) {
        console.error(e);
    }
});
/*
app.get('/', function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    if (infoFromURL.infoType == "all") {
        var indexFilePath = path.join(__dirname, "../www2", "student.htm");
        fs.access(indexFilePath, fs.F_OK, (err) => {
            if (err) {
                console.error(err); //
                res.send("Error to finding index file");
                return;
            }
            res.sendFile(indexFilePath);
        })
    } else if (infoFromURL.infoType == "form") { // &editType= add or edit
        var indexFilePath = path.join(__dirname, "../www2", "studentForm.htm");
        fs.readFile(indexFilePath, 'utf-8', function (err, data) {
            (async () => selectStudents().then(resultStudentArray => {
                var fileInfo = data.toString();
                var replacedRandom = fileInfo.replace("@editType", JSON.stringify(infoFromURL.editType));
                if(infoFromURL.editType == "edit") {
                    replacedRandom = replacedRandom.toString();
                    var replaced = replacedRandom.replace("@uidValue", JSON.stringify(infoFromURL.studentUid));
                }
                res.write(replaced);
                return res.end();
            }))();
        });
    } else if (infoFromURL.infoType == "getArray") {
        console.log("select"); //

        // res.writeHead(200, { 'Content-Type': 'text/html' });
        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

        (async () => selectStudents().then(resultStudentArray => {
            res.write(JSON.stringify(resultStudentArray));
            return res.end();
        }))();
    } else {
        var indexFilePath = path.join(__dirname, "../www2", "student.htm");
        fs.access(indexFilePath, fs.F_OK, (err) => {
            if (err) {
                console.error(err); //
                res.send("Error to finding index file");
                return;
            }
            res.sendFile(indexFilePath);
        })
    }
});
*/
app.post('/', function (req, res) {
    // for forms submits
});

app.listen(8080, function () {
    console.log('Server running at http://127.0.0.1:8080/');
});
