const multer = require("multer");

const DOC_DIR = './uploads/documents/doctors';

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DOC_DIR);
  },
  filename: (req, file, cb) => {
    const cvFileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, cvFileName)
  }
});


// Multer Mime Type Validation
var cvUpload = multer({
  storage: cvStorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf, .docx and .odf format allowed!'));
    }
  }
});


module.exports = cvUpload.single('cv');