const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { difficulty, score } = req.body;
    const user = await User.findById(req.userId);
    const key = `bestScore${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;

    if (score < user.profile[key]) user.profile[key] = score;
    user.profile.totalGames += 1;
    await user.save();

    res.json({ success: true, profile: user.profile });
  } catch {
    res.status(500).json({ error: 'Erreur sauvegarde' });
  }
});

module.exports = router;
