const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const url = require('url');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log("indexPhone"); //
    var infoFromURL = url.parse(req.url, true).query;
    fs.readFile('/home/givi/dev/StudentJS/www/indexPhone.htm', 'utf-8', function(err, data){
        var dataToString = data.toString();
        var replaced = dataToString.replace('@uidNumberHere', infoFromURL.studentUid); //
        console.log(infoFromURL.studentUid);
        console.log(replaced);
        res.write(replaced);
        return res.end();
        // res.sendFile(path.join('/home/givi/dev/StudentJS/www/indexPhone.htm'));
    });
});
app.listen(8091);
console.log('Server running at http://127.0.0.1:8091/');
