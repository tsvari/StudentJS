const http = require('http');
const fs = require('fs');
const url = require('url');
const filePathLocation = "../../data/data.json";

http.createServer(function(req, res){
    var infoFromURL = url.parse(req.url, true).query;
    var infoNumber = infoFromURL.number;
    try {
        if (fs.existsSync(filePathLocation)) {
            fs.readFile(filePathLocation, function(err, data) {
                console.log("delete"); //
                var dataArray = JSON.parse(data);
                for (var i=0; i<dataArray.length; i++) {
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
    } catch (error) {
        console.log(error);
    }
}).listen(8387);
console.log('Server started on localhost:8387; press Ctrl-C to terminate...!');
/*
    file:///home/givi/Desktop/DEV/ajax/image.html
*/
