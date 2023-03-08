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
};

export default function CarListing({
  vehicle,
  startDate,
  endDate,
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
            Reserve for {vehicle.pricePerDay}
          </button>
        </span>
      </span>
      {user && startDate && endDate && (
        <ReserveModal
          vehicle={vehicle}
          handleCloseModal={handleCloseModal}
          user={user}
          showModal={showModal}
          startDate={startDate}
          endDate={endDate}
        ></ReserveModal>
      )}
    </li>
  );
}
