const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/', async (req, res) => {
  const { auth0Id, name, email } = req.body;
  console.log('Received user:', { auth0Id, name, email });

  try {
    let user = await User.findOne({ auth0Id });
    console.log('User found:', user);

    if (user) {
      user.name = name;
      user.email = email;
      await user.save();
    } else {
      user = new User({ auth0Id, name, email });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ error: 'User creation/updating failed' });
  }
});
router.get('/:auth0Id', async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.params.auth0Id }).populate('fields');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Fetching user failed' });
  }
});

module.exports = router;
