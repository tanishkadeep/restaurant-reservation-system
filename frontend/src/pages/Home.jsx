import React from 'react';
import RestaurantList from '../components/RestaurantList';
import ReservationList from '../components/ReservationList';

const Home = () => (
  <div className="p-6">
    <RestaurantList />
    <ReservationList />
  </div>
);

export default Home;
