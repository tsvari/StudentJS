var fs = require('fs');
exports.generatorInfo = function () {
    var newUID = fs.readFileSync('idGenerator.txt', 'utf8');
    newUID = parseInt(newUID) + 1;
    // fs.writeFileSync('idGenerator.txt', newUID);
    return newUID;
};
