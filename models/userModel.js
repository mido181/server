const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Userschema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, " من فضلك أدخل الاسم الاول"],
    maxlength: [20, "من فضلك لا تكتب اكثر من 20 حرف"],
  },
  fullName: {
    type: String,
    lowercase: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "من فضلك أدخل اسم الاخير"],
    maxlength: [20, "من فضلك لا تكتب اكثر من 20 حرف"],
  },
  nicName: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: [20, "من فضلك لا تكتب اكثر من 20 حرف"],
    defult: "",
  },

  interest:{
    type:[String],
  },

  email: {
    type: String,
    required: [true, "من فضلك أدخل الأيميل"],
    unique: true,
    lowercase: true,
  }, //unique: true after finished i retry it
  country: { type: String, required: [true, "من فضلك أدخل اسم الدولة"] },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "من فضلك أدخل نوعك"],
  },
  password: {
    type: String,
    required: [true, "من فضلك أدخل كلمة السر"],
    select: false,
    minlength: 8,
  },
  // phoneNumber: { type: String, sparse: true }, // Optional unique: true,
  city: { type: String, required: [true, "من فضلك أدخل المدينة"] },
  height: { type: String },
  weight: { type: String },
  age: { type: Number },
  workAt: { type: String },
  eduction: { type: String },
  HavehChild: { type: Boolean, defult: false },
  images: { type: [String], maxlength: 5 },
  // Profile Details (Like BuzzArab)
  brithdate: { type: Date },
  profilePicture: { type: String, default: "default.jpg" },
  bio: {
    type: String,
    default: "لم أكتب بعد",
    maxlength: [1000, "من فضلك لا تكتب اكثر من 1000 حرف"],
  },

  // Verification (Like BuzzArab's strict checks)
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  verificationCode: { type: String, select: false },

  // Online Status & Activity
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
  socketId: { type: String }, // For real-time updates
  member: { type: String, enum: ["basic", "golden"], default: "basic" },
  refreshToken: { type: String, select: false },
  // Privacy & Settings
  hideAge: { type: Boolean, default: false },
  hideLastSeen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

Userschema.pre("save", async function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

Userschema.pre("save", async function (next) {
  this.profilePicture = `http://localhost:8000/public/images/users/default.jpg`;
  next();
});
Userschema.pre("save", function (next) {
  if (this.brithdate) {
    const today = new Date();
    const birthDate = new Date(this.brithdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    this.age = age;
  }
  next();
});

const userModel = mongoose.model("user", Userschema);

module.exports = userModel;
