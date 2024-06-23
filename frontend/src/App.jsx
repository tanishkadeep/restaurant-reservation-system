import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Restaurants from './pages/Restaurants';
import EditReservation from './pages/EditReservation';
import EditRestaurant from './pages/EditRestaurant';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/reservations/edit/:id" element={<EditReservation />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/edit/:id" element={<EditRestaurant />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
