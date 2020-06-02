var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join('/home/tsvari/dev/nodeJS/StudentJS/www/index.htm'));
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/'); //

