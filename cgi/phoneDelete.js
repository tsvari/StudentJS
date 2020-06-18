const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    const filePathLocation = "../data/phone.json";
    var infoFromURL = url.parse(req.url, true).query;
    try {
        console.log("DELETE PHONE"); //
        var arraySentFromClient = JSON.parse(infoFromURL.newMainArrayToReplace);
        if (fs.existsSync(filePathLocation)) {
            fs.readFile(filePathLocation, function (err, data) {
                var dataArray = JSON.parse(data);
                for (var i = 0; i < dataArray.length; i++) {
                    if (dataArray[i][0] == arraySentFromClient[0]) {
                        dataArray[i] = arraySentFromClient;
                    }
                }
                fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));

                res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
                res.write(JSON.stringify(dataArray));
                return res.end();
            });
        } else {
            res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8090);
console.log('Server started on localhost:8387; press Ctrl-C to terminate...!'); //
