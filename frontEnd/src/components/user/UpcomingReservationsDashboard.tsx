import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  ImageListItem,
  ImageList,
  ImageListItemBar,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Vehicle, Reservation } from "../../types/DataTypes";
import { VehicleContext } from "../../contexts/VehicleContext";
import { IconButton } from "material-ui";

type UpcomingReservationsDashboardProps = {
  classes: ClassNameMap;
};

export const UpcomingReservationsDashboard = ({
  classes,
}: UpcomingReservationsDashboardProps) => {
  const { user, api, setNewUser } = useContext(UserContext);
  const { vehicles } = useContext(VehicleContext);
  const { reservations } = user;

  const navigate = useNavigate();

  const deleteReservation = async (reservation: Reservation) => {
    const res = await api.deleteReservation(reservation);
    if (res) {
      const newReservations = reservations.filter(
        (r) => r.id !== reservation.id
      );
      setNewUser({ ...user, reservations: newReservations });
    }
  };

  const makeReservationInfo = (reservation: Reservation, index: number) => {
    //https://mui.com/system/display/
    const vehicle = vehicles.find(
      (vehicle) => vehicle.id === reservation.vehicle
    );
    if (!vehicle) {
      return null;
    }
    return (
      <ImageListItem key={index}>
        <img
          src={vehicle.imageURL}
          alt="Sick superhero vehicle"
          className="vehicleListingImage"
        ></img>
        <ImageListItemBar
          title={vehicle.name}
          subtitle={`${reservation.startDate} to ${reservation.endDate} `}
        ></ImageListItemBar>
      </ImageListItem>
    );
  };

  const noReservations = () => {
    return (
      <>
        <Typography align="center">No upcoming reservations</Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="small"
          onClick={() => navigate("/reservations")}
        >
          Create Reservation
        </Button>
      </>
    );
  };

  if (!reservations || reservations.length === 0) return noReservations();

  return (
    <>
      <Typography variant="h6">Upcoming Reservations</Typography>
      <Container>
        <ImageList>
          {reservations.map((reservation) =>
            makeReservationInfo(reservation, reservation.id)
          )}
        </ImageList>
        {reservations.map((reservation) => (
          <Button onClick={() => deleteReservation(reservation)}>Delete</Button>
        ))}
      </Container>
    </>
  );
};
