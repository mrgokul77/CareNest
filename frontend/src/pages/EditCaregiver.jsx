import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCaregiver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState({
    name: "",
    age: "",
    experience: "",
    speciality: "",
    availability: true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const specialities = [
    "Personal Care",
    "Companion Care",
    "Dementia Care",
    "Mobility Assistance",
    "Medication Management",
  ];

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/caregivers/${id}/`);
        setCaregiver(response.data);
      } catch (error) {
        setError("Error fetching caregiver details");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCaregiver((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // Convert age and experience to numbers
      const updatedCaregiver = {
        ...caregiver,
        age: parseInt(caregiver.age),
        experience: parseInt(caregiver.experience),
      };

      // Update the caregiver in the backend using the correct endpoint
      await axios.put(`http://localhost:8000/api/caregivers/${id}/update/`, updatedCaregiver);
      
      // Show success message
      alert("Caregiver updated successfully!");
      
      // Navigate to caregivers list
      navigate("/caregivers");
    } catch (error) {
      setError(error.response?.data || "Error updating caregiver");
      console.error("Error:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Caregiver</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={caregiver.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Age (minimum 20)</label>
          <input
            type="number"
            name="age"
            value={caregiver.age}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            min="20"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Experience (years, minimum 1)</label>
          <input
            type="number"
            name="experience"
            value={caregiver.experience}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Speciality</label>
          <select
            name="speciality"
            value={caregiver.speciality}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Speciality</option>
            {specialities.map((speciality, index) => (
              <option key={index} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={caregiver.availability}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">Available</span>
          </label>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Caregiver"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/caregivers")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCaregiver;
