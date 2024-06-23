import React from 'react';
import RestaurantList from '../components/RestaurantList';
import ReservationList from '../components/ReservationList';

const Home = () => (
  <div className="my-12 mx-24">
    <RestaurantList />
    <div className='mt-24'></div>
    <ReservationList />
  </div>
);

export default Home;
