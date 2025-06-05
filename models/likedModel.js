const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  liker: { type: Schema.Types.ObjectId, ref: "user", required: true },
  liked: { type: Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "revoked"], default: "active" },
});

// Prevent duplicate likes
likeSchema.index({ liker: 1, liked: 1 }, { unique: true });

module.exports = mongoose.model("like", likeSchema);
