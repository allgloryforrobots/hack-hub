const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;