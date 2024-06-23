import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/reservations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReservations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/reservations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setReservations(reservations.filter((reservation) => reservation._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <div className="grid gap-4">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="p-4 bg-white shadow-md rounded">
            <p>
              <strong>User:</strong> {reservation.user.name}
            </p>
            <p>
              <strong>Restaurant:</strong> {reservation.restaurant.name}
            </p>
            <p>
              <strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {reservation.time}
            </p>
            <p>
              <strong>Guests:</strong> {reservation.guests}
            </p>
            <div className="flex space-x-2 mt-4">
              <Link to={`/reservations/edit/${reservation._id}`} className="px-3 py-2 bg-blue-500 text-white rounded">
                Edit
              </Link>
              <button onClick={() => handleDelete(reservation._id)} className="px-3 py-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;
