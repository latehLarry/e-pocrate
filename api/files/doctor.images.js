const multer = require("multer");

const IMG_DIR = './uploads/images/doctors';

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMG_DIR);
  },
  filename: (req, file, cb) => {
    const imgFileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, imgFileName)
  }
});

// Multer Mime Type Validation
var imgUpload = multer({
  storage: imgStorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


module.exports = imgUpload.single('photo');