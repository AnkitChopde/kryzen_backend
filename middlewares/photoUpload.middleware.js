const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  
  filename: (req, file, cb) => {
    console.log(file.originalname)
    cb(null, file.originalname); // Rename the file to avoid naming conflicts
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;