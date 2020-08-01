app.get('/', function (req, res) {
    var infoFromURL = url.parse(req.url, true).query;


    if (infoFromURL.infoType == "form") { // &editType= add or edit
        var indexFilePath = path.join(__dirname, "../www2", "studentForm.htm");
        fs.readFile(indexFilePath, 'utf-8', function (err, data) {
            (async () => selectStudents().then(resultStudentArray => {
                var fileInfo = data.toString();
                var replacedRandom = fileInfo.replace("@editType", JSON.stringify(infoFromURL.editType));
                if(infoFromURL.editType == "edit") {
                    replacedRandom = replacedRandom.toString();
                    var replaced = replacedRandom.replace("@uidValue", JSON.stringify(infoFromURL.studentUid));
                }
                res.write(replaced);
                return res.end();
            }))();
        });
    } else if (infoFromURL.infoType == "data") { // ?infoType=data&uid=all
        // TODO: check uid on existant. if not retun nothing
        if (infoFromURL.uid == "all") {
            console.log("select"); //

            // res.writeHead(200, { 'Content-Type': 'text/html' });
            res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

            (async () => selectStudents().then(resultStudentArray => {
                res.write(JSON.stringify(resultStudentArray));
                return res.end();
            }))();
        } else { // ?infoType=data&uid=5
            // TODO: parse infoFromURL.uid to int and use
            // to return single student
            // implement and use  selectStudentByUid(uid)
        }
    } else {
        var indexFilePath = path.join(__dirname, "../www2", "student.htm");
        fs.access(indexFilePath, fs.F_OK, (err) => {
            if (err) {
                console.error(err); //
                res.send("Error to finding index file");
                return;
            }
            res.sendFile(indexFilePath);
        })
    }
});
