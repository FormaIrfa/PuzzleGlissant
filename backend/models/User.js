const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile: {
    bestScoreBeginner: { type: Number, default: 999 },
    bestScoreIntermediate: { type: Number, default: 999 },
    bestScorePro: { type: Number, default: 999 },
    totalGames: { type: Number, default: 0 },
  }
});

module.exports = mongoose.model('User', userSchema);
