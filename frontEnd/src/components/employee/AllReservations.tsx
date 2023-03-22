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
        setTodayReservations(reservations);
      }
    });
  };

  useEffect(() => {
    getReservations();
  }, []);

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
            <TableCell>{reservation.vehicle}</TableCell>
            <TableCell>{reservation.autoUser}</TableCell>
            <TableCell>{reservation.isInsured ? "Yes" : "No"}</TableCell>
            <TableCell>{reservation.isCheckedOut ? "Yes" : "No"}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
