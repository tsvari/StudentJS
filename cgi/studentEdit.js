const http = require('http');
const fs = require('fs');
const url = require('url');
// ToDo: if first one is changed change it in data.json as well;

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = "../data/data.json";
    try {
        console.log("EDIT"); //
        if (JSON.stringify(infoFromURL).includes("editFromIndexPhone35252007")) {
            console.log("PHONE"); //
            var newArray = JSON.parse(infoFromURL.editFromIndexPhone35252007);

            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    console.log("edit person"); //
                    var dataArray = JSON.parse(data);

                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].uid == newArray[0]) {
                            if (dataArray[i].phone == newArray[1]) { } else {
                                dataArray[i].phone = newArray[1];
                            }
                        }
                    }

                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].uid == newArray[0]) {
                            if (dataArray[i].morePhones) {
                                if (dataArray[i].secondPhone == newArray[2]) { } else {
                                    dataArray[i].secondPhone = newArray[2];
                                }
                            } else { }
                        }
                    }

                    fs.writeFileSync("../data/data.json", JSON.stringify(dataArray));
                });
            } else {
                res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
                res.write("");
                return res.end();
            }

            filePathLocation = "../data/phone.json";
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    console.log("edit phone"); //
                    var dataArray = JSON.parse(data);

                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i][0] == newArray[0]) {
                            dataArray[i] = newArray;
                        } else { }
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
            var newArray = JSON.parse(infoFromURL.edit);

            filePathLocation = "../data/phone.json";
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    console.log("edit phone"); //

                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i][0] == newArray.uid) {
                            if (dataArray[i][1] == newArray.phone) { } else {
                                dataArray[i][1] = newArray.phone;
                            }
                        }
                    }

                    fs.writeFileSync("../data/phone.json", JSON.stringify(dataArray));
                });
            } else {
                res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
                res.write("");
                return res.end();
            }

            filePathLocation = "../data/data.json";
            if (fs.existsSync(filePathLocation)) {
                fs.readFile(filePathLocation, function (err, data) {
                    console.log("edit person"); //

                    var dataArray = JSON.parse(data);
                    for (var i = 0; i < dataArray.length; i++) {
                        if (dataArray[i].uid == newArray.uid) {
                            dataArray[i] = newArray;
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
}).listen(8386);
console.log('Server running at http://127.0.0.1:8386/'); //
