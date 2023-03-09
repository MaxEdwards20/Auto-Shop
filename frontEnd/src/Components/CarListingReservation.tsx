import { useContext } from "react";
import { Vehicle } from "../types/DataTypes";
import { UserContext } from "../contexts/AuthContext";
import { useState } from "react";
import { UnAuthResponse } from "./UnAuthResponse";
import { ReserveModal } from "./ReserveModal";
import { formatCurrency } from "../hooks/miscFunctions";
import React from "react";
import { forwardRef } from "react";
import { checkUserAndRedirect } from "../hooks/miscFunctions";
type CarListingProps = {
  vehicle: Vehicle;
  startDate?: Date;
  endDate?: Date;
  updateVehicleList: () => void;
};

export const CarListing = forwardRef(function (
  { vehicle, startDate, endDate, updateVehicleList }: CarListingProps,
  ref
) {
  const [showModal, setShowModal] = useState(false);
  const { api, user } = useContext(UserContext);
  checkUserAndRedirect();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    updateVehicleList();
  };

  return (
    <li key={vehicle.id} className="reservationListing">
      <img
        src={vehicle.imageURL}
        alt="Sick superhero vehicle"
        className="vehicleReservationImage"
      ></img>
      {vehicle.name}
      <span className="outerButtonContainer">
        <span className="buttonContainer">
          <button id="reserveButton" onClick={() => handleClick()}>
            {formatCurrency(vehicle.pricePerDay)}/day
          </button>
        </span>
      </span>
      {user && startDate && endDate && showModal && (
        <ReserveModal
          vehicle={vehicle}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          startDate={startDate}
          endDate={endDate}
          ref={ref}
        ></ReserveModal>
      )}
    </li>
  );
});
