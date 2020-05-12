var http = require('http');
var fs = require('fs');
var url = require('url');
var generatorIdModule = require('./logger.js');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    console.log(infoFromURL); //

    var newArray = JSON.parse(infoFromURL.addNew);
    console.log(newArray); //
    var filePathLocation = "../../data/data.json";
    try {
        if (fs.existsSync(filePathLocation)) {
            fs.readFile(filePathLocation, function(err, data) {
                console.log('add'); //
                var newUID = generatorIdModule.generatorInfo();
                console.log(newUID);
                fs.readFile('idGenerator.txt', 'utf8',  function(err2, data2) {
                    fs.writeFileSync('idGenerator.txt', newUID);
                });
                newArray.uid = newUID;
                newArray.approved = true;
                var dataArray = JSON.parse(data);
                newArray.img = newArray.uid + ".jpg";
                dataArray.push(newArray);

                console.log(dataArray); //
                fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));

                res.writeHead(200, {"Access-Control-Allow-Origin" : "*"});
                res.write(JSON.stringify(dataArray));
                return res.end();
            });
        } else {
            res.writeHead(200, {"Access-Control-Allow-Origin" : "*"});
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8385);
console.log('Server running at http://127.0.0.1:8385/');
