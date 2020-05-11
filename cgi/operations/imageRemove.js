var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res){
    var infoFromURL = url.parse(req.url, true).query;
    console.log(infoFromURL); //

    var filePathLocation = "../../data/data.json";
    try {
        if (fs.existsSync(filePathLocation)) {
            fs.readFile(filePathLocation, function(err, data) {
                console.log("delete"); //
                console.log(data); //
                var dataArray = JSON.parse(data);
                console.log(dataArray); //
                var infoNumber = infoFromURL.number;
                console.log(infoNumber); //
        
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
        
    }
}).listen(8387);
console.log('Server started on localhost:8387; press Ctrl-C to terminate...!');
/*
    file:///home/givi/Desktop/DEV/ajax/image.html
*/
