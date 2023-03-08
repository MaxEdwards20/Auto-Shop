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
import { AuthContext } from "../contexts/AuthContext";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Vehicle, ReservationInfo } from "../types/DataTypes";

type UpcomingReservationsDashboardProps = {
  reservations: ReservationInfo[];
  classes: ClassNameMap;
};

export const UpcomingReservationsDashboard = ({
  reservations,
  classes,
}: UpcomingReservationsDashboardProps) => {
  const { vehicles } = useContext(AuthContext);
  const navigate = useNavigate();

  const makeReservationInfo = (reservation: ReservationInfo, index: number) => {
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
