import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/atoms";

const ReservationForm = () => {
  const [userName, setUserName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/restaurants"
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/v1/reservations",
        { userName, restaurantName, date, time, guests },
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      alert("Reservation created successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
      <h2 className="mb-4 text-xl font-bold">Make a Reservation</h2>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your Name"
        className="w-full px-3 py-2 mb-4 border rounded"
        required
      />
      <select
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>
          Select Restaurant
        </option>
        {restaurants.map((restaurant) => (
          <option key={restaurant._id} value={restaurant.name}>
            {restaurant.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded"
        required
      />
      <input
        type="number"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        min="1"
        className="w-full px-3 py-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full px-3 py-2 bg-blue-500 text-white rounded"
      >
        Reserve
      </button>
    </form>
  );
};

export default ReservationForm;
