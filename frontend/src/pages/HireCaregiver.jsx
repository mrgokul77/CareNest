import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const HireCaregiver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState(null);
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    start_date: "",
    duration: "", // in months
    requirements: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(false);

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/caregivers/${id}/`);
        setCaregiver(response.data);
        if (!response.data.availability) {
          setError("This caregiver is not available for hire");
          setLoading(false);
          return;
        }
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHiring(true);
    try {
      // First, create the hiring record
      await axios.post(`http://localhost:8000/api/caregivers/${id}/hire/`, formData);
      
      // Then, update the caregiver's availability
      await axios.put(`http://localhost:8000/api/caregivers/${id}/update/`, {
        ...caregiver,
        availability: false,
      });
      
      // Show success message
      alert("Caregiver hired successfully!");
      
      // Navigate to caregivers list
      navigate("/caregivers");
    } catch (error) {
      setError(error.response?.data || "Error hiring caregiver");
      console.error("Error:", error);
    } finally {
      setHiring(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!caregiver) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-500">Caregiver not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Hire Caregiver: {caregiver.name}</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Caregiver Details:</h2>
        <p>Speciality: {caregiver.speciality}</p>
        <p>Experience: {caregiver.experience} years</p>
        <p>Age: {caregiver.age}</p>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Name</label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="client_email"
            value={formData.client_email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="client_phone"
            value={formData.client_phone}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Duration (months)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Special Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="4"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            disabled={hiring}
          >
            {hiring ? "Hiring..." : "Hire Caregiver"}
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

export default HireCaregiver; 