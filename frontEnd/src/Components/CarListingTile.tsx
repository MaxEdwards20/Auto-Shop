import { Car } from "../types/DataTypes";

interface CarListingProps {
    car: Car;
}

export default function CarListing(props: CarListingProps) {
    return (
        <div className="carTile" key={props.car.vin}>
            <img src={props.car.imageSrc} alt="Sick superhero vehicle" className="vehicleListingImage"></img>
            <span>
                {`${props.car.year} ${props.car.make} ${props.car.model} ${props.car.edition} ${props.car.color} ${props.car.mileage}`}
            </span>
        </div>
    )
}