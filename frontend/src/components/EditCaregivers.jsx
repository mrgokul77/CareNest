import React, { useState, useEffect } from 'react';

const EditCaregivers = ({ caregiver, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    experience: '',
    speciality: '',
    availability: true
  });

  const [errors, setErrors] = useState({});

  const specialities = [
    "Personal Care",
    "Companion Care",
    "Dementia Care",
    "Mobility Assistance",
    "Medication Management",
  ];

  useEffect(() => {
    if (caregiver) {
      setFormData({
        name: caregiver.name,
        age: caregiver.age,
        experience: caregiver.experience,
        speciality: caregiver.speciality,
        availability: caregiver.availability
      });
    }
  }, [caregiver]);

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.age < 20) {
      newErrors.age = "Age must be at least 20 years";
    }
    
    if (formData.experience < 1) {
      newErrors.experience = "Experience must be at least 1 year";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(caregiver.id, formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Edit Caregiver</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="20"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.age ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-500">{errors.age}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.experience ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
          <select
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          >
            {specialities.map((speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="rounded border-gray-300"
          />
          <label className="text-sm font-medium text-gray-700">Available</label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Update Caregiver
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCaregivers; 