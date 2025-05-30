const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    password: { type: String, required:true,select: false },
    phone: { type: String, unique: true, sparse: true }, // Optional
    city: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },

    // Profile Details (Like BuzzArab)
    birthDate: { type: Date },
    profilePicture: { type: String, default: "/images/default.jpg" },
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
