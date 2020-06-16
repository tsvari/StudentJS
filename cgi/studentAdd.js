const http = require('http');
const fs = require('fs');
const url = require('url');
const generatorIdModule = require('./modules/logger.js');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    var filePathLocation = "../data/data.json";

    try {
        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
        if (fs.existsSync(filePathLocation)) {
            var newArray = JSON.parse(infoFromURL.addNew);
            var newUID = generatorIdModule.generatorInfo();
            fs.writeFileSync('idGenerator.txt', newUID);
            newArray.uid = newUID;
            newArray.img = newArray.uid + ".jpg";

            console.log('ADD'); //
            if (infoFromURL.type == "index") {
                console.log("INDEX"); //

                fs.readFile("../data/phone.json", function (err, data) {
                    console.log("phone"); //
                    var dataArray = JSON.parse(data);
                    var newPhoneArray;
                    if (newArray.phone == "") {
                        newPhoneArray = [newArray.uid];
                    } else {
                        newPhoneArray = [newArray.uid, newArray.phone];
                    }
                    dataArray.push(newPhoneArray);

                    fs.writeFileSync("../data/phone.json", JSON.stringify(dataArray));
                });

                fs.readFile(filePathLocation, function (err, data) {
                    console.log("person"); //
                    var dataArray = JSON.parse(data);
                    dataArray.push(newArray);

                    fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));

                    res.write(JSON.stringify(dataArray));
                    return res.end();
                });
            } else if (infoFromURL.type == "phone") {
                console.log("INDEXPHONE"); //

                var phoneArrayTaken = fs.readFileSync("../data/phone.json").toString();
                var phoneMainArray = JSON.parse(phoneArrayTaken);
                var currentPartNum;
                for (let i = 0; i < phoneMainArray.length; i++) {
                    if (phoneMainArray[i][0] == JSON.parse(infoFromURL.currentPart)) {
                        currentPartNum = i;
                    }
                }


                fs.readFile(filePathLocation, function (err, data) {
                    console.log("person"); //

                    var dataArray = JSON.parse(data);
                    if (phoneMainArray[currentPartNum].length == 2) {
                        for (let i = 0; i < dataArray.length; i++) {
                            if (dataArray[i].uid == infoFromURL.currentPart) {
                                dataArray[i].secondPhone = newArray;
                                dataArray[i].morePhones = "y";
                                fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                            }
                        }
                    }

                    if (phoneMainArray[currentPartNum].length == 1) {
                        for (let i = 0; i < dataArray.length; i++) {
                            if (dataArray[i].uid == infoFromURL.currentPart) {
                                dataArray[i].phone = newArray;
                                dataArray[i].morePhones = "n";
                                fs.writeFileSync(filePathLocation, JSON.stringify(dataArray));
                            }
                        }
                    }
                });

                fs.readFile("../data/phone.json", function (err, data) {
                    console.log("phone"); //

                    // JSON.parse(infoFromURL.currentPart)
                    var dataArray = JSON.parse(data);
                    dataArray[currentPartNum].push(newArray);

                    fs.writeFileSync("../data/phone.json", JSON.stringify(dataArray));
                    res.write(JSON.stringify(dataArray[currentPartNum]));
                    return res.end();
                });
            }
        } else {
            res.write("");
            return res.end();
        }
    } catch (error) {
        console.log(error); //
    }
}).listen(8086);
console.log('Server running at http://127.0.0.1:8086/'); //
