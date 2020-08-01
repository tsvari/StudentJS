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
    const collection = db.collection("Student");
    const result = collection.find(query);
    const studentArray = await result.toArray();
    return studentArray;
}

http.createServer(function (req, res) {
    console.log("select"); //

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

    (async () => selectStudents().then(resultStudentArray => {
        res.write(JSON.stringify(resultStudentArray));
        return res.end();
    }))();

}).listen(8087);
console.log('Server running at http://127.0.0.1:8087/'); //
