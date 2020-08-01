const http = require('http');
const fs = require('fs');
const url = require('url');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://givitm:giviko2007@cluster0.ysiz8.mongodb.net/testDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function selectStudents() {
    // Connect to the MongoDB cluster
    await client.connect();
    const query = {};
    const db = client.db("testDB");
    const collection = db.collection("Phone");
    const result = collection.find(query);
    const studentArray = await result.toArray();
    return studentArray;
}

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    console.log("selectPhone"); //

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    try {
        (async () => selectStudents().then(dataArray => {
            for (let i = 0; i < dataArray.length; i++) {
                if (infoFromURL.studentUid == dataArray[i].student_uid) {
                    dataArray = dataArray[i];
                    break;
                } else {
                    if (dataArray.length - 1 == i) {
                        res.write("");
                        return res.end();
                    }
                }
            }
            res.write(JSON.stringify(dataArray));
            return res.end();
        }))();
    } catch (error) {
        console.log(error); //
    }

}).listen(8083);
console.log('Server running at http://127.0.0.1:8087/'); //
