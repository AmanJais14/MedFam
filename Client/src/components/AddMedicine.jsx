import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddMedicine = ({ onMedicineAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: { times: 1, period: 'daily' },
    timing: ['09:00'],
    assignedTo: '',
    notes: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/medicines', formData);
      toast.success('Medicine added successfully');
      onMedicineAdded(response.data);
      setFormData({
        name: '',
        dosage: '',
        frequency: { times: 1, period: 'daily' },
        timing: ['09:00'],
        assignedTo: '',
        notes: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: ''
      });
    } catch (error) {
      toast.error('Failed to add medicine');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Dosage</label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                value={formData.frequency.times}
                onChange={(e) => setFormData({
                  ...formData,
                  frequency: { ...formData.frequency, times: parseInt(e.target.value) }
                })}
                className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              <select
                value={formData.frequency.period}
                onChange={(e) => setFormData({
                  ...formData,
                  frequency: { ...formData.frequency, period: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;