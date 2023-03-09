import CarListingTile from "../components/CarListingTile";
import { Vehicle } from "../types/DataTypes";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Typography } from "@mui/material";
import { VehicleContext } from "../contexts/VehicleContext";

function VehiclePage() {
  const { vehicles } = useContext(VehicleContext);
  const [userMessage, setUserMessage] = useState("");

  return (
    <div className="root">
      <div className="carListContainer">
        {vehicles.map((vehicle) => (
          <div className="carListTile" key={vehicle.id}>
            <CarListingTile {...vehicle} />
          </div>
        ))}
        {userMessage && <Typography> {userMessage}</Typography>}
      </div>
    </div>
  );
}
export default VehiclePage;
