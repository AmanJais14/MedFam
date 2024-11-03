const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');

// Create medicine
router.post('/', auth, async (req, res) => {
  try {
    const medicine = new Medicine({
      ...req.body,
      familyId: req.user.familyId
    });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all medicines for family
router.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ familyId: req.user.familyId })
      .populate('assignedTo', 'name');
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update medicine
router.put('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, familyId: req.user.familyId },
      req.body,
      { new: true }
    ).populate('assignedTo', 'name');
    
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete medicine
router.delete('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      familyId: req.user.familyId
    });
    
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});