import { useContext, useEffect } from "react";
import { Vehicle } from "../../types/DataTypes";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";
import { UnAuthResponse } from "../user/UnAuthResponse";
import { ReserveModal } from "./ReserveModal";
import { formatCurrency } from "../../hooks/miscFunctions";
import React from "react";
import { forwardRef } from "react";
import { checkUserAndRedirect } from "../../hooks/validationHooks";
import { ManagerContext } from "../../contexts/ManagerContext";
import Dialog from "material-ui/Dialog";

type CarListingProps = {
  vehicle: Vehicle;
  startDate: Date;
  endDate: Date;
  updateVehicleList: () => void;
};

export const CarListing = ({
  vehicle,
  startDate,
  endDate,
  updateVehicleList,
}: CarListingProps) => {
  const [showModal, setShowModal] = useState(false);
  const { api, user, subtractMoney, addNewReservation } =
    useContext(UserContext);
  const { manager } = useContext(ManagerContext);
  checkUserAndRedirect();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    updateVehicleList();
  };

  const removeFunds = (totalCost: number) => {
    api.removeMoneyFromUser(user.id, totalCost).then((user) => {
      if (!user) {
        console.error("Error updating user balance. Please try again.");
      } else {
        console.log("Subtracting: ", totalCost, " from user: ", user.balance);
        subtractMoney(totalCost); // Adjust state to reflect the new balance
        user.balance = user.balance - totalCost; // For the modal
      }
      // now we update the manager balance because we took the money from the user
      api.addMoneyToManager(manager.id, totalCost).then((manager) => {
        if (!manager) {
          console.error("Error updating manager balance. Please try again.");
        }
      });
    });
  };

  const createReservation = (isInsured: boolean) => {
    api
      .createReservation(user.id, vehicle.id, startDate, endDate, isInsured)
      .then((reservation) => {
        if (!reservation) {
          console.error("Error creating reservation. Please try again.");
        } else {
          addNewReservation(reservation);
        }
      });
  };

  const handleReserveClick = (isInsured: boolean, totalCost: number) => {
    if (user.balance < totalCost) {
      console.error("Not enough funds to make reservation.");
      return;
    }
    createReservation(isInsured); // update the user's reservations
    removeFunds(totalCost); // Reservation is made so update the funds available for the user
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
          <button id="reserveButton" onClick={handleClick}>
            {formatCurrency(vehicle.pricePerDay)}/day
          </button>
        </span>
      </span>
      {user && startDate && endDate && showModal && (
        <ReserveModal
          user={user}
          vehicle={vehicle}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          startDate={startDate}
          endDate={endDate}
          handleReserveClick={handleReserveClick}
        ></ReserveModal>
      )}
    </li>
  );
};
