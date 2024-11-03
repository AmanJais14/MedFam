const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: {
    times: { type: Number, required: true },
    period: { type: String, enum: ['daily', 'weekly'], required: true }
  },
  timing: [{ type: String }], // Array of time strings like "09:00"
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  familyId: { type: String, required: true },
  notes: String,
  startDate: { type: Date, required: true },
  endDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);