const http = require('http'); // WORKS
const fs = require('fs');
const url = require('url');
const MongoClient = require('mongodb').MongoClient;
const mongoClientURL = "mongodb+srv://givitm:giviko2007@cluster0.ysiz8.mongodb.net/testDB?retryWrites=true&w=majority";

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = "../data/phone.json";
    console.log("selectPhone"); //

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    try {
        if (fs.existsSync(filePathLocation)) {
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
                    var dataArray = await result.toArray();
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
                } catch (e) {
                    console.error(e);
                } finally {
                    await client.close();
                }
            }
            selectStudents().catch(console.error);
        } else {
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8083);
console.log('Server running at http://127.0.0.1:8083/'); //
