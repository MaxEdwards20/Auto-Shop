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

export const CheckInVehicle = () => {
  const { api } = useContext(UserContext);
  checkUserIsEmployeeAndRedirect();
  const [todayCheckins, setTodayCheckins] = useState<Reservation[]>([]);

  const getReservations = () => {
    api.getAllReservations().then((reservations) => {
      if (!reservations) {
        console.error("Error retrieving reservations");
      } else {
        const date = new Date();
        const todayReservations = reservations.filter((reservation) => {
          const resDay = parseInt(reservation.endDate.slice(8, 10));
          const resMonth = parseInt(reservation.endDate.slice(5, 7));
          const resYear = parseInt(reservation.endDate.slice(0, 4));
          return (
            resDay === date.getDate() &&
            resMonth === date.getMonth() + 1 && // Months are 0 indexed
            resYear === date.getFullYear()
          );
        });
        console.log(todayReservations);
        setTodayCheckins(todayReservations);
      }
    });
  };

  useEffect(() => {
    getReservations();
  }, []);

  const checkInVehicle = (reservation: Reservation) => {
    api.checkInReservation(reservation).then((reservation) => {
      if (!reservation) {
        console.error("Error checking out vehicle");
      } else {
        // reset vehicle back to unLowJacked
        unLowJackVehicle(reservation);
        // update state
        setTodayCheckins(
          todayCheckins.filter((res) => res.id !== reservation.id)
        );
      }
    });
  };

  const unLowJackVehicle = (reservation: Reservation) => {
    api.lowJackVehicle(reservation.vehicle, false).then((vehicle: Vehicle) => {
      if (!vehicle) {
        console.error("Error low jacking vehicle");
      } else {
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
        </TableRow>
      </TableHead>
      <TableBody>
        {todayCheckins.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.startDate}</TableCell>
            <TableCell>{reservation.endDate}</TableCell>
            <TableCell>{reservation.vehicle}</TableCell>
            <TableCell>{reservation.autoUser}</TableCell>
            <TableCell>{reservation.isInsured ? "Yes" : "No"}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={() => checkInVehicle(reservation)}
              >
                Check In
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
