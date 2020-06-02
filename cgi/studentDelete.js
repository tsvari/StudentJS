const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function(req, res){
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = "../data/data.json";
    var infoNumber = infoFromURL.phoneNumber3523;
    try {
        if (JSON.stringify(infoFromURL).includes("phoneNumber3523")) {
            filePathLocation = "../data/phone.json";
            if (fs.existsSync(filePathLocation)) {
                fs.readFile("../data/data.json", function(err, data) {
                    console.log("delete person"); //
                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].uid == infoNumber) {
                            dataArray[i].phone = "";
                        }
                    }
                    fs.writeFileSync("../data/data.json", JSON.stringify(dataArray));
                });
                fs.readFile(filePathLocation, function(err, data) {
                    console.log("delete phone"); //
                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i][0] == infoNumber) {
                            dataArray.splice(i, 1);
                        }
                    }
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
        } else {
            if (fs.existsSync(filePathLocation)) {
                var infoNumber = infoFromURL.number;
                //
                fs.readFile("../data/phone.json", function(err, data) {
                    console.log("delete phone"); //
                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i][0] == infoNumber) {
                            dataArray.splice(i, 1);
                        }
                    }
                    fs.writeFileSync("../data/phone.json", JSON.stringify(dataArray));
                });
                //
                fs.readFile(filePathLocation, function(err, data) {
                    console.log("delete person"); //
                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].uid == infoNumber) {
                            dataArray.splice(i, 1);
                        }
                    }
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
        }
    } catch (error) {
        console.log(error);
    }
}).listen(8390);
console.log('Server started on localhost:8387; press Ctrl-C to terminate...!');
