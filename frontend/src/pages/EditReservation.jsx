import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/reservations/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const { user, restaurant, date, time, guests } = response.data;
        setUser(user);
        setRestaurant(restaurant);
        setDate(date);
        setTime(time);
        setGuests(guests);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReservation();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/v1/reservations/${id}`,
        { user, restaurant, date, time, guests },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/reservations');
    } catch (error) {
      setError('Failed to update reservation.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Reservation</h1>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Restaurant</label>
          <input
            type="text"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditReservation;
