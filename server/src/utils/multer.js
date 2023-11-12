const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});

module.exports = multer({ storage: storage });
