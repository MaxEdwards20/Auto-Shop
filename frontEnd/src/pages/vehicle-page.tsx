import { Rentals } from "../DummyData"
import CarListing from '../Components/CarListingTile';
import { Car } from '../types/DataTypes';
import { useState } from "react";

function VehiclePage() {
  const [carList, setCarList] = useState<Car[]>(Rentals);
  return (
    <div className="root">
      <div className="carListContainer">
        {carList.map((rental) => (
          <div className='carListTile'>
            <CarListing car={rental} />
          </div>
          )
        )}
      </div>
    </div>
  )
}
export default VehiclePage;
