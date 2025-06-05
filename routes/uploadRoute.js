const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/imageUploadController');

// Single image upload
router.post('/', uploadController.uploadImage);

// Multiple images upload
router.post('/upload-multiple', uploadController.uploadMultipleImages);

// Delete image
router.delete('/delete/:filename', uploadController.deleteImage);

module.exports = router;