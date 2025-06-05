
// Update user route
const User = require("../models/userModel");
exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    
    // Handle file upload if present
    if (req.file) {
      updates.profilePicture = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: error.message });
  }
};
