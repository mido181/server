const multer = require("multer");
const path = require("path");

// Configure where to store files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/"); // Save to 'uploads/' folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Save as timestamp + original name
  },
});

const upload = multer({ storage });

module.exports = upload;