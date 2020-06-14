var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

// viewed at http://localhost:8080
app.get('/', function (req, res) {
    var indexFilePath = path.join(__dirname, "../www", "index.htm");
    fs.access(indexFilePath, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            res.send("Error to finding index file");
        return;
        }
        //file exists
        res.sendFile(indexFilePath);
    })
    // or use this
    /*
    try {
        if (fs.existsSync(path)) {
        //file exists
        }
    } catch(err) {
        console.error(err)
    }
    */
    //res.sendFile(path.join('/home/givi/dev/StudentJS/www/index.htm'));
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/'); //

