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
} from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import { AccountCircle, DirectionsCar, Payment } from "@material-ui/icons";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export const ManagerDrawer = ({ open, onClose }: DrawerProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleUpdateUserClick = () => {
    navigate("/manager/users");
    onClose();
  };

  const handlePurchaseVehicleClick = () => {
    navigate("/manager/purchase");
    onClose();
  };

  const handlePayEmployeeClick = () => {
    navigate("/manager/employees");
    onClose();
  };

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
          <ListItem button component={RouterLink} to="/manager/users">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="View Users" />
          </ListItem>
          <ListItem button component={RouterLink} to="/manager/purchase">
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Purchase Vehicle" />
          </ListItem>
          <ListItem button component={RouterLink} to="/manager/employees">
            <ListItemIcon>
              <Payment />
            </ListItemIcon>
            <ListItemText primary="Pay Employees" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
