import { Typography } from "@mui/material";
import { Vehicle } from "../types/DataTypes";

export default function CarListing(props: Vehicle) {
  return (
    <div className="carTile" key={props.vin}>
      <img
        src={props.imageURL}
        alt="Sick superhero vehicle"
        className="vehicleListingImage"
      ></img>
      <Typography variant="h5">{`${props.name} `}</Typography>
      <Typography variant="subtitle1">
        {" "}
        {`Fee per day: $${props.pricePerDay}`}
      </Typography>
    </div>
  );
}
