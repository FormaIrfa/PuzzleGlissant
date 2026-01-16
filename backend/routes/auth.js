const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, 'secret-jwt-puzzle', { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, username, profile: user.profile } });
  } catch (error) {
    res.status(400).json({ error: 'Email déjà utilisé' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Identifiants incorrects' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Identifiants incorrects' });

    const token = jwt.sign({ id: user._id }, 'secret-jwt-puzzle', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, profile: user.profile } });
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET PROFILE
router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

module.exports = router;
