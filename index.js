const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const userRoutes = require('./routes/userRoutes');
const fieldRoutes = require('./routes/fieldRoutes');

app.use('/api/users', userRoutes);
app.use('/api/fields', fieldRoutes);
app.get('/', (req, res) => {
  res.send('Agri Backend is running!');
});
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection failed:', err));
