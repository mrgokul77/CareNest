import React, { useState } from "react";
import axios from "axios";

const AddCaregivers = ({ setShowAddForm, setCaregivers }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    experience: "",
    speciality: "",
    availability: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/caregivers/", formData);
      console.log("Caregiver added:", response.data);
      setCaregivers((prevCaregivers) => [...prevCaregivers, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding caregiver:", error);
      alert("Error adding caregiver. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-6">Add New Caregiver</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="experience" className="block text-gray-700">Experience (Years)</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="speciality" className="block text-gray-700">Speciality</label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              value={formData.speciality}
              onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mt-2"
              required
            />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="availability"
              checked={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
            />
            <label htmlFor="availability" className="text-gray-700">Available for work</label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Caregiver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCaregivers;
