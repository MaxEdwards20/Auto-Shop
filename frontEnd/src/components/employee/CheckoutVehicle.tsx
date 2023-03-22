import { checkUserIsEmployeeAndRedirect } from "../../hooks/validationHooks";
import { Reservation } from "../../types/DataTypes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
export const CheckoutVehicle = () => {
  const { api } = useContext(UserContext);
  checkUserIsEmployeeAndRedirect();
  const [todayReservations, setTodayReservations] = useState<Reservation[]>([]);

  const getReservations = () => {
    api.getAllReservations().then((reservations) => {
      if (!reservations) {
        console.error("Error retrieving reservations");
      } else {
        // TODO: Debugs this
        const date = new Date();
        const todayReservations = reservations.filter((reservation) => {
          const resDay = reservation.startDate.slice(8, 10);
          const resMonth = reservation.startDate.slice(5, 7);
          const resYear = reservation.startDate.slice(0, 4);
          return (
            parseInt(resDay) === date.getDate() &&
            parseInt(resMonth) === date.getMonth() &&
            parseInt(resYear) === date.getFullYear()
          );
        });
        console.log(todayReservations);
        setTodayReservations(todayReservations);
      }
    });
  };

  useEffect(() => {
    getReservations();
  }, []);

  return <div>Checkout Vehicle</div>;
};
