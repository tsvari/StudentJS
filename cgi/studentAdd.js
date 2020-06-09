const http = require('http');
const fs = require('fs');
const url = require('url');
const generatorIdModule = require('./modules/logger.js');
const filePathLocation = "../data/data.json";

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;

    var newArray = JSON.parse(infoFromURL.addNew);
    try {
        if (fs.existsSync(filePathLocation)) {
            fs.readFile(filePathLocation, function (err, data) {
                console.log('add'); //
                var dataArray = JSON.parse(data);
                var newUID = generatorIdModule.generatorInfo();
                newArray.uid = newUID;
                newArray.img = newArray.uid + ".jpg";
                dataArray.push(newArray);

                fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                fs.writeFileSync('idGenerator.txt', newUID);

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
}).listen(8385);
console.log('Server running at http://127.0.0.1:8385/'); //
