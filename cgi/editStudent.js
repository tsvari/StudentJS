const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const generatorIdModule = require('./modules/logger.js');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = path.join(__dirname, "../data", "data.json");
    try {
        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
        if (infoFromURL.editType == "edit") {
            console.log("EDIT STUDENT"); //
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    var dataArray = JSON.parse(data);
                    dataArray[infoFromURL.currentRow].name = infoFromURL.name;
                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                    res.write(JSON.stringify(dataArray));
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else if (infoFromURL.editType == "add") {
            console.log("ADD STUDENT"); //
            var newArray = { "uid": -1, "name": infoFromURL.name, "img": infoFromURL.img };
            var newUID = generatorIdModule.generatorInfo();
            fs.writeFileSync('idGenerator.txt', newUID);
            newArray.uid = newUID;
            newArray.img = newArray.uid + ".jpg";
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    var dataArray = JSON.parse(data);
                    dataArray.push(newArray);
                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                    res.write(JSON.stringify(dataArray));
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else if (infoFromURL.editType == "del") {
            console.log("DELETE PERSON"); //
            var arraySentFromClient = infoFromURL.number;
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].uid == arraySentFromClient) {
                            dataArray.splice(i, 1);
                        }
                    }
                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));

                    res.write(JSON.stringify(dataArray));
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }

        } else {
            console.log("no info on where to go was given! error!");
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8085);
console.log('Server running at http://127.0.0.1:8085/'); //
