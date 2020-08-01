const fs = require('fs');
const path = require('path');
exports.generatorInfo = function () {
    var idGeneratorFileLocation = path.join(__dirname, "../", "idGenerator.txt");
    var newUID = fs.readFileSync(idGeneratorFileLocation, 'utf8');
    newUID = parseInt(newUID) + 1;
    // fs.writeFileSync('idGenerator.txt', newUID);
    return newUID;
};

