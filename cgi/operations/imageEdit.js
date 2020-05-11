var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;
    console.log(infoFromURL); //

    var newArray = JSON.parse(infoFromURL.edit);
    console.log(newArray); //
    var filePathLocation = "../../data/data.json";
    try {
        if (fs.existsSync(filePathLocation)) {
            fs.readFile(filePathLocation, function(err, data) {
                console.log("edit"); //
                var dataArray = JSON.parse(data);
                console.log(dataArray); //
        
                for (var i=0; i<dataArray.length; i++) {
                    if (dataArray[i].uid == newArray.uid) {
                        dataArray[i] = newArray;
                    }
                }
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
}).listen(8386);
console.log('Server running at http://127.0.0.1:8386/');
