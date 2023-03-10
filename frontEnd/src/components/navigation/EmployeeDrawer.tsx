import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  DirectionsCar as CarIcon,
  EventSeat as ReservationIcon,
  AccountCircle as AccountIcon,
  AccessTime as LogHoursIcon,
  ExitToApp as CheckoutVehicleIcon,
} from "@material-ui/icons";

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export const EmployeeDrawer = ({ open, onClose }: DrawerProps) => {
  const classes = useStyles();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={classes.list} role="presentation">
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={RouterLink} to="/vehicles">
            <ListItemIcon>
              <CarIcon />
            </ListItemIcon>
            <ListItemText primary="View Our Vehicles" />
          </ListItem>
          <ListItem button component={RouterLink} to="/reservations">
            <ListItemIcon>
              <ReservationIcon />
            </ListItemIcon>
            <ListItemText primary="Make a Reservation" />
          </ListItem>
          <ListItem button component={RouterLink} to="/account/dashboard">
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={RouterLink} to="/account/log-hours">
            <ListItemIcon>
              <LogHoursIcon />
            </ListItemIcon>
            <ListItemText primary="Log Hours" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/account/checkout-vehicle"
          >
            <ListItemIcon>
              <CheckoutVehicleIcon />
            </ListItemIcon>
            <ListItemText primary="Checkout Vehicle" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
