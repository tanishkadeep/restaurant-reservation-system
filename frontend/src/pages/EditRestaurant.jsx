import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/restaurants/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const { name, address, capacity } = response.data;
        setName(name);
        setAddress(address);
        setCapacity(capacity);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/v1/restaurants/${id}`,
        { name, address, capacity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/restaurants');
    } catch (error) {
      setError('Failed to update restaurant.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Restaurant</h1>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Capacity"
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
