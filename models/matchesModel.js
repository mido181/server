const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  matchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);