import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Pencil, Search } from "lucide-react";
import AddCaregiver from "../components/AddCaregiver";
import EditCaregivers from "../components/EditCaregivers";

const Caregivers = forwardRef((props, ref) => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCaregiver, setEditingCaregiver] = useState(null);

  const navigate = useNavigate();

  const specialities = [
    "Personal Care",
    "Companion Care",
    "Dementia Care",
    "Mobility Assistance",
    "Medication Management",
  ];

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/caregivers/");
      setCaregivers(response.data);
      setFilteredCaregivers(response.data);
    } catch (error) {
      setError("Error fetching caregivers");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaregivers();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: fetchCaregivers,
  }));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSpecialityFilterChange = (e) => {
    setSpecialityFilter(e.target.value);
  };

  const handleHire = (id) => {
    navigate(`/caregivers/${id}/hire`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this caregiver?")) {
      try {
        await axios.delete(`http://localhost:8000/api/caregivers/${id}/`);
        setCaregivers(caregivers.filter((caregiver) => caregiver.id !== id));
        setFilteredCaregivers(filteredCaregivers.filter((caregiver) => caregiver.id !== id));
      } catch (error) {
        console.error("Error deleting caregiver:", error);
        alert(error.response?.data?.message || "Error deleting caregiver. Please try again.");
      }
    }
  };

  const handleAdd = async (caregiverData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/caregivers/", caregiverData);
      setCaregivers([...caregivers, response.data]);
      setFilteredCaregivers([...filteredCaregivers, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding caregiver:", error);
      alert(error.response?.data?.message || "Error adding caregiver. Please try again.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8000/api/caregivers/${id}/update/`, updatedData);
      // Update the caregiver in the local state
      setCaregivers(caregivers.map(caregiver => 
        caregiver.id === id ? { ...caregiver, ...updatedData } : caregiver
      ));
      setFilteredCaregivers(filteredCaregivers.map(caregiver => 
        caregiver.id === id ? { ...caregiver, ...updatedData } : caregiver
      ));
      setEditingCaregiver(null);
    } catch (error) {
      console.error("Error updating caregiver:", error);
      alert(error.response?.data?.message || "Error updating caregiver. Please try again.");
    }
  };

  // Filter caregivers based on search and specialty
  useEffect(() => {
    let filtered = [...caregivers];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(caregiver => 
        caregiver.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by speciality
    if (specialityFilter) {
      filtered = filtered.filter(caregiver => 
        caregiver.speciality === specialityFilter
      );
    }
    
    setFilteredCaregivers(filtered);
  }, [searchQuery, specialityFilter, caregivers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Your Caregiver</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search caregivers by name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>
              <select
                value={specialityFilter}
                onChange={handleSpecialityFilterChange}
                className="px-6 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white"
              >
                <option value="">All Specialities</option>
                {specialities.map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Available Caregivers</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Caregiver
          </button>
        </div>
        
        {/* Add Caregiver Form */}
        {showAddForm && (
          <AddCaregiver 
            setShowAddForm={setShowAddForm} 
            onAdd={handleAdd}
          />
        )}

        {/* Edit Caregiver Form */}
        {editingCaregiver && (
          <EditCaregivers
            caregiver={editingCaregiver}
            onUpdate={handleUpdate}
            onCancel={() => setEditingCaregiver(null)}
          />
        )}

        {filteredCaregivers.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-lg">No caregivers found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{caregiver.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      caregiver.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {caregiver.availability ? "Available" : "Not Available"}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Age:</span>
                    <span>{caregiver.age} years</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Experience:</span>
                    <span>{caregiver.experience} years</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">Speciality:</span>
                    <span>{caregiver.speciality}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {caregiver.availability && (
                    <button
                      onClick={() => handleHire(caregiver.id)}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                    >
                      Hire
                    </button>
                  )}
                  <button
                    onClick={() => setEditingCaregiver(caregiver)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(caregiver.id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default Caregivers;
