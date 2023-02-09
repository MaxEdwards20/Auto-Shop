import { Car } from "../Types";

interface CarListingProps {
    car: Car;
}

export function CarListing(props: CarListingProps) {
    return (
        <div className="liContainer">
            <li key={props.car.vin}>
                <span title={`${props.car.year} ${props.car.make} ${props.car.model}`}>
                    {`${props.car.year} ${props.car.make} ${props.car.model} ${props.car.edition} ${props.car.color} ${props.car.mileage}`}
                </span>
                <span className="outerButtonContainer">
                    <span className="buttonContainer">
                        <button id="editButton">Edit</button>
                    </span>
                    <span className="buttonContainer">
                        <button id="deleteButton">Delete</button>
                    </span>
                </span>
            </li>
        </div>
    )
}