const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }, //unique: true after finished i retry it
    country: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, sparse: true }, // Optional unique: true,
    city: { type: String, required: true },
    height: { type: String },
    weight: { type: String },
    age:{type:Number},
    // Profile Details (Like BuzzArab)
    birthDate: { type: Date },
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
    member: { type:String, enum: ["basic", "golden"], default:'basic' },
    refreshToken: { type: String, select: false },
    // Privacy & Settings
    hideAge: { type: Boolean, default: false },
    hideLastSeen: { type: Boolean, default: false },
  },
  { timeStamp: true }
);

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
Userschema.pre('save', function(next) {
  if (this.birthDate) {
    const today = new Date();
    const birthdate = new Date(this.birthDate);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    this.age = age;
  }
  next();
});

const userModel = mongoose.model("user", Userschema);

module.exports = userModel;
