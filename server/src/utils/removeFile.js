const fs = require('fs');

const removeFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        throw err; 
    });
};

module.exports = removeFile;