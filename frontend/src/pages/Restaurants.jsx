import React, { useEffect, useState } from "react";
import RestaurantForm from "../components/RestaurantForm";
import RestaurantList from "../components/RestaurantList";

const Restaurants = () => {
  return (
    <div className="mx-16 my-8">
      <RestaurantForm />
      <div className="mt-12"></div>
      <RestaurantList />
    </div>
  );
};

export default Restaurants;
