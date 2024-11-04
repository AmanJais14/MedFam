const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const auth = require('../middleware/auth');

// Create reminder
router.post('/', auth, async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reminders for user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.params.userId })
      .populate('medicine', 'name dosage')
      .populate('user', 'name');
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update reminder status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('medicine', 'name dosage')
     .populate('user', 'name');
    
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily reminders for family
router.get('/daily', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const reminders = await Reminder.find({
      date: {
        $gte: today,
        $lt: tomorrow
      },
      medicine: {
        $in: await Medicine.find({ familyId: req.user.familyId }).select('_id')
      }
    }).populate('medicine', 'name dosage')
      .populate('user', 'name');
    
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;