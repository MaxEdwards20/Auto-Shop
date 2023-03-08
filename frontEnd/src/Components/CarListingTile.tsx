import { Typography } from "@mui/material";
import { Vehicle } from "../types/DataTypes";

export default function CarListing(vehicle: Vehicle) {
  return (
    <div className="carTile">
      <img
        src={vehicle.imageURL}
        alt="Sick superhero vehicle"
        className="vehicleListingImage"
      ></img>
      <Typography variant="h5">{`${vehicle.name} `}</Typography>
      <Typography variant="subtitle1">
        {" "}
        {`Fee per day: $${vehicle.pricePerDay}`}
      </Typography>
    </div>
  );
}
