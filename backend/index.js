const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const scoreRoutes = require('./routes/scores');

const app = express();
app.use(cors({ origin: 'http://10.0.2.2:8081', credentials: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/puzzleDB')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

app.listen(5000, () => console.log('🚀 Serveur démarré sur http://localhost:5000'));
