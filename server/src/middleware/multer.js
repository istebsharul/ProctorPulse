const multer = require('multer');
const { diskStorage } = multer;

const storage = diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
