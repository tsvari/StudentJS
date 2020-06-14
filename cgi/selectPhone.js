const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = "../data/phone.json";
    console.log("selectPhone"); //
    // studentUid;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    try {
        if (fs.existsSync(filePathLocation)) {
            fs.readFile(filePathLocation, function (err, data) {
                var dataArray = JSON.parse(data);

                for (let i = 0; i < dataArray.length; i++) {
                    if (infoFromURL.studentUid == dataArray[i][0]) {
                        dataArray = dataArray[i];
                        break;
                    } else {
                        if (i == dataArray.length - 1) {
                            res.write("");
                            return res.end();
                        }
                    }
                }

                var dataToString = JSON.stringify(dataArray);
                res.write(dataToString);
                return res.end();
            });
        } else {
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8088);
console.log('Server running at http://127.0.0.1:8388/'); //
