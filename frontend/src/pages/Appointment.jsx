import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Appointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/caregivers/${id}/`)  // Fetch caregiver details
      .then((res) => res.json())
      .then((data) => setCaregiver(data))
      .catch((error) => console.error("Error fetching caregiver details:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    setLoading(true);
    try {
      // Simulate backend request
      await fetch("http://127.0.0.1:8000/api/hire-caregiver/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caregiver_id: id, date, time }),
      });

      setSuccess(true);
      setTimeout(() => navigate("/my-hirings"), 2000); // Redirect to hirings page
    } catch (error) {
      alert("Failed to hire caregiver. Please try again.");
    }
    setLoading(false);
  };

  if (!caregiver) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Hire a Caregiver</h2>

      <div className="border rounded-lg shadow-md p-4">
        <div className="flex items-center gap-4">
          <img src={caregiver.image} alt={caregiver.name} className="w-16 h-16 rounded-full" />
          <div>
            <p className="text-lg font-semibold">{caregiver.name}</p>
            <p className="text-sm text-gray-600">{caregiver.speciality}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block mb-2 text-gray-700">Select Date:</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded-lg mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block mb-2 text-gray-700">Select Time:</label>
          <input
            type="time"
            className="w-full border px-3 py-2 rounded-lg mb-4"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Hiring..." : "Hire Caregiver"}
          </button>
        </form>

        {success && (
          <p className="mt-3 text-green-500 text-center">Caregiver hired successfully! Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default Appointment;
