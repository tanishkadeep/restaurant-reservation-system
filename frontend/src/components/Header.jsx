import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Restaurant Reservation
        </Link>
        <nav>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/reservations" className="mr-4">
            Reservations
          </Link>
          <Link to="/restaurants" className="mr-4">
            Restaurants
          </Link>

          {token ? (
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register" className="mr-4">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
