const express = require('express');
const app = express();
const path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log("index"); //
    res.sendFile(path.join('/home/givi/dev/StudentJS/www/index.htm'));
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
