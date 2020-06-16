const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = "../data/data.json";
    try {
        if (JSON.stringify(infoFromURL).includes("phoneNumber3523")) {
            console.log("PHONE"); //    
            var arraySentFromClient = JSON.parse(infoFromURL.phoneNumber3523);
            filePathLocation = "../data/phone.json";
            if (fs.existsSync(filePathLocation)) {
                fs.readFile("../data/data.json", function (err, data) {
                    console.log("delete person"); //
                    var currentIValue = JSON.parse(infoFromURL.iValueCurrent);
                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].uid == arraySentFromClient[0]) {
                            if (arraySentFromClient[1] != "") {
                                dataArray[i].phone = arraySentFromClient[1];
                                if (arraySentFromClient.length == 1 || arraySentFromClient.length == 2) {
                                    dataArray[i].secondPhone = null;
                                    dataArray[i].morePhones = "n";
                                } else {
                                    dataArray[i].secondPhone = arraySentFromClient[2];
                                    dataArray[i].morePhones = "y";
                                }
                            } else {
                                dataArray[i].phone = "";
                            }
                        }
                    }
                    fs.writeFileSync("../data/data.json", JSON.stringify(dataArray));
                });

                fs.readFile(filePathLocation, function (err, data) {
                    console.log("delete phone"); //
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
        } else {
            console.log("PERSON"); //
            if (fs.existsSync(filePathLocation)) {
                var arraySentFromClient = infoFromURL.number;
                //
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

                fs.readFile(filePathLocation, function (err, data) {
                    console.log("delete person"); //
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
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8084);
console.log('Server started on localhost:8387; press Ctrl-C to terminate...!'); //
