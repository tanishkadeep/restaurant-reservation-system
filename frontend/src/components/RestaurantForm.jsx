import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/atoms";

const RestaurantForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const auth = useRecoilValue(authAtom);

  const handleCheckboxChange = (e) => {
    setAvailability({
      ...availability,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/v1/restaurants",
        { name, address, capacity: parseInt(capacity, 10), availability },
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      alert("Restaurant added successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
      <h2 className="mb-4 text-xl font-bold">Add a Restaurant</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Restaurant Name"
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
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">Availability</h3>
        {Object.keys(availability).map((day) => (
          <div key={day} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={day}
              name={day}
              checked={availability[day]}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor={day} className="capitalize">
              {day}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 bg-blue-500 text-white rounded"
      >
        Add Restaurant
      </button>
    </form>
  );
};

export default RestaurantForm;
