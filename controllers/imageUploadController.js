const multer = require("multer");

const upload = multer({ dest: "public/images/users" });
// Single file upload
exports.uploadImage = async (req, res) => {
  try {
    // The 'image' should match the field name in your form
    upload.single('image')(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      // File uploaded successfully
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size
        }
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Multiple files upload
exports.uploadMultipleImages = async (req, res) => {
  try {
    upload.array('images', 5)(req, res, function (err) { // Max 5 files
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded'
        });
      }

      const uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        size: file.size
      }));

      res.status(200).json({
        success: true,
        message: 'Files uploaded successfully',
        data: uploadedFiles
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete uploaded image
exports.deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error deleting file',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};