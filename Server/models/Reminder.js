const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'taken', 'missed'], default: 'pending' },
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
