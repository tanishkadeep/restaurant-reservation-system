import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/restaurants', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/restaurants/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <div className="grid gap-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="p-4 bg-white shadow-md rounded">
            <p>
              <strong>Name:</strong> {restaurant.name}
            </p>
            <p>
              <strong>Address:</strong> {restaurant.address}
            </p>
            <p>
              <strong>Capacity:</strong> {restaurant.capacity}
            </p>
            <div className="flex space-x-2 mt-4">
              <Link to={`/restaurants/edit/${restaurant._id}`} className="px-3 py-2 bg-blue-500 text-white rounded">
                Edit
              </Link>
              <button onClick={() => handleDelete(restaurant._id)} className="px-3 py-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
