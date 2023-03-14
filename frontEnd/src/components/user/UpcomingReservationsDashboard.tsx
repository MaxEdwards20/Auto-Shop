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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Vehicle, Reservation } from "../../types/DataTypes";
import { VehicleContext } from "../../contexts/VehicleContext";

type UpcomingReservationsDashboardProps = {
  classes: ClassNameMap;
};

export const UpcomingReservationsDashboard = ({
  classes,
}: UpcomingReservationsDashboardProps) => {
  const { user, api } = useContext(UserContext);
  const { vehicles } = useContext(VehicleContext);
  const { reservations } = user;

  const navigate = useNavigate();

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
      <ImageList>
        {reservations.map((reservation) =>
          makeReservationInfo(reservation, reservation.id)
        )}
      </ImageList>
    </>
  );
};
