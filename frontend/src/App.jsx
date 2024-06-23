// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import RestaurantList from "./components/RestaurantList";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
