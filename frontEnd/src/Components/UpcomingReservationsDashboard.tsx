import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReservationInfo } from "../types/DataTypes";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

type UpcomingReservationsDashboardProps = {
  reservations: ReservationInfo[];
  classes: ClassNameMap;
};

export const UpcomingReservationsDashboard = ({
  reservations,
  classes,
}: UpcomingReservationsDashboardProps) => {
  console.log(reservations);
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h6">Upcoming Reservations</Typography>
      <List className={classes.list}>
        {reservations ? (
          reservations.map((reservation, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${reservation.startDate} to ${reservation.endDate}`}
                secondary={reservation.amountDue}
              />
            </ListItem>
          ))
        ) : (
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
        )}
      </List>
    </>
  );
};
