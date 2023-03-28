import { checkUserIsEmployeeAndRedirect } from "../../hooks/validationHooks";
import { Reservation, Vehicle } from "../../types/DataTypes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";

export const CheckoutVehicle = () => {
  const { api } = useContext(UserContext);
  checkUserIsEmployeeAndRedirect();
  const [todayReservations, setTodayReservations] = useState<Reservation[]>([]);
  const [disabledLowJackButtons, setDisabledLowJackButtons] = useState<
    number[]
  >([]);

  const getReservations = () => {
    api.getAllReservations().then((reservations) => {
      if (!reservations) {
        console.error("Error retrieving reservations");
      } else {
        const date = new Date();
        const todayReservations = reservations.filter((reservation) => {
          const resDay = parseInt(reservation.startDate.slice(8, 10));
          const resMonth = parseInt(reservation.startDate.slice(5, 7));
          const resYear = parseInt(reservation.startDate.slice(0, 4));
          return (
            resDay === date.getDate() &&
            resMonth === date.getMonth() + 1 && // Months are 0 indexed
            resYear === date.getFullYear() &&
            !reservation.isCheckedOut
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

  const checkoutVehicle = (reservation: Reservation) => {
    api.checkOutReservation(reservation).then((reservation) => {
      if (!reservation) {
        console.error("Error checking out vehicle");
      } else {
        // update state
        setTodayReservations(
          todayReservations.filter((res) => res.id !== reservation.id)
        );
      }
    });
  };

  const lowJackVehicle = (reservation: Reservation) => {
    api
      .lowJackVehicle(reservation.vehicle.id, true)
      .then((vehicle: Vehicle) => {
        if (!vehicle) {
          console.error("Error low jacking vehicle");
        } else {
          setDisabledLowJackButtons([
            ...disabledLowJackButtons,
            reservation.id,
          ]);
          return;
        }
      });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Vehicle</TableCell>
          <TableCell>Auto User</TableCell>
          <TableCell>Insured</TableCell>
          <TableCell>Checked Out</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todayReservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.startDate}</TableCell>
            <TableCell>{reservation.endDate}</TableCell>
            <TableCell>{reservation.vehicle.name}</TableCell>
            <TableCell>{reservation.autoUser.name}</TableCell>
            <TableCell>{reservation.isInsured ? "Yes" : "No"}</TableCell>
            <TableCell>{reservation.isCheckedOut ? "Yes" : "No"}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={() => checkoutVehicle(reservation)}
              >
                Checkout
              </Button>
              <Button
                variant="contained"
                onClick={() => lowJackVehicle(reservation)}
                disabled={
                  reservation.isInsured ||
                  reservation.vehicle.isLoadJacked ||
                  disabledLowJackButtons.includes(reservation.id)
                }
              >
                Low Jack
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
