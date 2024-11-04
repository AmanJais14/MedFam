import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('/api/medicines');
        setMedicines(response.data);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Medicine Schedule</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {medicines.map((medicine) => (
            <li key={medicine._id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-indigo-600 truncate">{medicine.name}</p>
                  <p className="mt-1 flex items-center text-sm text-gray-500">
                    {medicine.dosage} • {medicine.frequency.times}x {medicine.frequency.period}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <p className="text-sm text-gray-500">
                    Next: {format(new Date(medicine.nextDose), 'PPp')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicineList;