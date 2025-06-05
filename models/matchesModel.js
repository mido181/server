const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  matchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);