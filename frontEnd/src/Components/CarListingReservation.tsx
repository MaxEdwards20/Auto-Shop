import { useContext } from "react";
import { Vehicle } from "../types/DataTypes";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { UnAuthResponse } from "./UnAuthResponse";
import { ReserveModal } from "./ReserveModal";

type CarListingProps = {
  vehicle: Vehicle;
  startDate?: Date;
  endDate?: Date;
  updateVehicleList: () => void;
};

export default function CarListing({
  vehicle,
  startDate,
  endDate,
  updateVehicleList,
}: CarListingProps) {
  const [showModal, setShowModal] = useState(false);
  const { api, user } = useContext(AuthContext);

  const handleClick = () => {
    if (!user) {
      return <UnAuthResponse></UnAuthResponse>;
    }
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
            ${vehicle.pricePerDay}/day
          </button>
        </span>
      </span>
      {user && startDate && endDate && (
        <ReserveModal
          vehicle={vehicle}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          startDate={startDate}
          endDate={endDate}
        ></ReserveModal>
      )}
    </li>
  );
}
