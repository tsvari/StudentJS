const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = "../data/data.json";
    try {
        console.log("DELETE PERSON"); //
        if (fs.existsSync(filePathLocation)) {
            var arraySentFromClient = infoFromURL.number;
            /*
            fs.readFile("../data/phone.json", function (err, data) {
                console.log("delete phone"); //
                var dataArray = JSON.parse(data);
                for (var i = 0; i < dataArray.length; i++) {
                    if (dataArray[i][0] == arraySentFromClient) {
                        dataArray.splice(i, 1);
                    }
                }
                fs.writeFileSync("../data/phone.json", JSON.stringify(dataArray));
            });
            */

            fs.readFile(filePathLocation, function (err, data) {
                var dataArray = JSON.parse(data);
                for (var i = 0; i < dataArray.length; i++) {
                    if (dataArray[i].uid == arraySentFromClient) {
                        dataArray.splice(i, 1);
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
}).listen(8084);
console.log('Server started on localhost:8387; press Ctrl-C to terminate...!'); //
