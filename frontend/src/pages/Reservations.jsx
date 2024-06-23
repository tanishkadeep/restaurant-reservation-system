import React, { useEffect, useState } from "react";
import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";

const Reservations = () => {
  return (
    <div className="mx-16 my-8">
      <ReservationForm />
      <div className="mt-12"></div>
      <ReservationList />
    </div>
  );
};

export default Reservations;
