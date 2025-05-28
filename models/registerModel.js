const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, sparse: true }, // Optional
    password: { type: String, select: false },

    // Profile Details (Like BuzzArab)
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    birthDate: { type: Date },
    country: { type: String, required: true },
    city: { type: String, required: true },
    profilePicture: { type: String, default: "default.jpg" },
    bio: { type: String, maxlength: 500 },

    // Verification (Like BuzzArab's strict checks)
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    verificationCode: { type: String, select: false },

    // Online Status & Activity
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    socketId: { type: String }, // For real-time updates

    // Privacy & Settings
    hideAge: { type: Boolean, default: false },
    hideLastSeen: { type: Boolean, default: false },
  },
  { timeStamp: true }
);

const userModel = mongoose.model("user", Userschema);

module.exports = userModel;
