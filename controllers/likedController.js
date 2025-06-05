const Like = require('../models/likedModel');
const Match = require('../models/matchesModel');
const User = require('../models/userModel');

// Like a user
    
 exports.likeUser = async (req, res) => {
  try {
    const { likerId, likedId } = req.body;

    // Check if already liked
    const existingLike = await Like.findOne({ liker: likerId, liked: likedId });
    if (existingLike) {
      return res.status(400).json({ message: 'أنت بالفعل معجب بهذا العضو' });
    }

    // Create new like
    if (!existingLike) {
      const newLike = new Like({ liker: likerId, liked: likedId });
        await newLike.save();
        return res.status(201).json({ message: 'تم الأعجاب' });
    }

    // Check for a match (if the other user also liked them)
    const reverseLike = await Like.findOne({ liker: likedId, liked: likerId });
    if (reverseLike) {
      const newMatch = new Match({ users: [likerId, likedId] });
      await newMatch.save();
      return res.status(201).json({ match: true, message: "It's a match!" });
    }

    res.status(201).json({ match: false, message: "Like recorded!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Unlike a user
exports.unlikeUser =  async (req, res) => {
  try {
    const { likerId, likedId } = req.body;
    const deletedLike = await Like.findOneAndDelete({ liker: likerId, liked: likedId });
    
    if (!deletedLike) {
      return res.status(404).json({ message: 'Like not found' });
    }

    res.status(200).json({ message: 'Like removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users liked by a specific user
exports.allLikesOther =  async (req, res) => {
  try {
    const likes = await Like.find({ liker: req.params.userId, status: 'active' })
      .populate('liked', 'username profilePic');
    
    res.status(200).json(likes.map(like => like.liked));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users who liked the current user
 exports.allLikesMe =  async (req, res) => {
  try {
    const likes = await Like.find({ liked: req.params.userId, status: 'active' })
      .populate('liker', 'username profilePic');
    
    res.status(200).json(likes.map(like => like.liker));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all matches (mutual likes)
exports.allLikesEachother = async (req, res) => {
  try {
    const matches = await Match.find({ users: req.params.userId })
      .populate('users', 'username profilePic');
    
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

