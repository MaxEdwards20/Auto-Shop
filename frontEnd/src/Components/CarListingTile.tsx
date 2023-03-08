import { Vehicle } from "../types/DataTypes";

export default function CarListing(props: Vehicle) {
  return (
    <div className="carTile" key={props.vin}>
      <img
        src={props.image}
        alt="Sick superhero vehicle"
        className="vehicleListingImage"
      ></img>
      <span>{`${props.name} Fee per day: ${props.pricePerDay} `}</span>
    </div>
  );
}
