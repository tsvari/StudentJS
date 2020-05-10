var http = require('http');
var fs = require('fs');
var url = require('url');

var filePathLocation = "../data/data.json";

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.writeHead(200, {"Access-Control-Allow-Origin" : "*"});
    try {
        fs.readFile(filePathLocation, function (err, data) {
            if (fs.existsSync(filePathLocation)) {
                res.write(data);
                return res.end();
            } else {
                res.write("");
                return res.end();
            }
        });
    } catch (error) {
        console.log(error);
    }
}).listen(8388);
console.log('Server running at http://127.0.0.1:8388/');
