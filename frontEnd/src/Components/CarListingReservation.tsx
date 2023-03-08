import { useContext } from "react";
import { Vehicle } from "../types/DataTypes";
import { AuthContext } from "../contexts/AuthContext";

export default function CarListing(props: Vehicle) {
  const { api, user } = useContext(AuthContext);
  const handleClick = () => {
    console.log(`You reserved the ${props.name} `);
    // Create pop up modal here?

    //TODO: Add reservation to database
    // api.createReservation();
  };
  return (
    <li key={props.vin} className="reservationListing">
      <img
        src={props.imageURL}
        alt="Sick superhero vehicle"
        className="vehicleReservationImage"
      ></img>
      {props.name}
      <span className="outerButtonContainer">
        <span className="buttonContainer">
          <button id="reserveButton" onClick={() => handleClick()}>
            Reserve for {props.pricePerDay}
          </button>
        </span>
      </span>
    </li>
  );
}
