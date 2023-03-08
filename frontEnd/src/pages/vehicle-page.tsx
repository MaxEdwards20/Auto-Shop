import CarListing from "../components/CarListingTile";
import { Vehicle } from "../types/DataTypes";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function VehiclePage() {
  const [carList, setCarList] = useState<Vehicle[]>();
  const { api, user } = useContext(AuthContext);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    api.getAllVehicles().then((cars) => {
      if (!cars) {
        setUserMessage("No cars found");
        return;
      }
      setCarList(cars);
    });
  }, []);

  return (
    <div className="root">
      <div className="carListContainer">
        {carList &&
          carList.map((rental) => (
            <div className="carListTile">
              <CarListing {...rental} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default VehiclePage;
