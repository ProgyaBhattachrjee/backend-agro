const express = require('express');
const router = express.Router();
const Field = require('../models/Field');
const User = require('../models/User');

// Add a new field to a user
router.post('/', async (req, res) => {
  const { auth0Id, location, crop, diseases, yield: fieldYield } = req.body;

  try {
    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const field = new Field({
      user: user._id,
      location,
      crop,
      diseases,
      yield: fieldYield
    });

    await field.save();

    user.fields.push(field._id);
    await user.save();

    res.status(201).json(field);
  } catch (error) {
    res.status(500).json({ error: 'Adding field failed' });
  }
});
router.get('/', async (req, res) => {
  const fields = await Field.find().populate('user');
  res.json(fields);
});

module.exports = router;
