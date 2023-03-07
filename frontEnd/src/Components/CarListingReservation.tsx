import { useContext } from "react";
import { Vehicle } from "../types/DataTypes";
import { AuthContext } from "../contexts/AuthContext";

export default function CarListing(props: Vehicle) {
  const { api, user } = useContext(AuthContext);
  const handleClick = () => {
    console.log(`You reserved the ${props.year} ${props.make} ${props.model}`);
    // Create pop up modal here?

    //TODO: Add reservation to database
    // api.createReservation();
  };
  return (
    <li key={props.vin} className="reservationListing">
      <img
        src={props.imageSrc}
        alt="Sick superhero vehicle"
        className="vehicleReservationImage"
      ></img>
      {`${props.year} ${props.make} ${props.model} ${props.edition} ${props.color} ${props.mileage}`}
      <span className="outerButtonContainer">
        <span className="buttonContainer">
          <button id="reserveButton" onClick={() => handleClick()}>
            Reserve
          </button>
        </span>
      </span>
    </li>
  );
}
