import CarListingTile from "../components/CarListingTile";
import { Vehicle } from "../types/DataTypes";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Typography } from "@mui/material";

function VehiclePage() {
  const { api, user, vehicles } = useContext(AuthContext);
  const [userMessage, setUserMessage] = useState("");

  return (
    <div className="root">
      <div className="carListContainer">
        {vehicles.map((rental) => (
          <div className="carListTile" key={rental.id}>
            <CarListingTile {...rental} />
          </div>
        ))}
        {userMessage && <Typography> {userMessage}</Typography>}
      </div>
    </div>
  );
}
export default VehiclePage;
