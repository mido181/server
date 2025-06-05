const router = require("express").Router();
const {
  getAllUsers,
  getOnlineUsers,
  getNewestUsers,
  getUserById,
} = require("../controllers/userCategoryController");


const {update} = require('../controllers/updateUserController')

const multer = require('multer');

// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'user-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get("/", getAllUsers);
router.get("/actives", getOnlineUsers);
router.get("/newest", getNewestUsers);
router.get("/id/:id", getUserById);
router.put("/update/:id",upload.single('profilePicture'), update);

module.exports = router;
