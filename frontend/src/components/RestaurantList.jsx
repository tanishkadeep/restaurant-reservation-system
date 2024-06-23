import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { restaurantListState } from "../atoms";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useRecoilState(restaurantListState);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/restaurants"
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [setRestaurants]);

  if (!restaurants) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          <h2>{restaurant.name}</h2>
          <p>Address: {restaurant.address}</p>
          <p>Capacity: {restaurant.capacity}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
