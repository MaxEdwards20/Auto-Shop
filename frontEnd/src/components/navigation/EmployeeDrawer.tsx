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
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";

import { Link as RouterLink } from "react-router-dom";
import { DrawerBaseList } from "./DrawerBaseList";

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
          <DrawerBaseList></DrawerBaseList>
          <ListItem button component={RouterLink} to="/employee/hours">
            <ListItemIcon>
              <LogHoursIcon />
            </ListItemIcon>
            <ListItemText primary="Log Hours" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/employee/checkout-vehicle"
          >
            <ListItemIcon>
              <CheckoutVehicleIcon />
            </ListItemIcon>
            <ListItemText primary="Checkout Vehicle" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/employee/checkin-vehicle"
          >
            <ListItemIcon>
              <CheckoutVehicleIcon />
            </ListItemIcon>
            <ListItemText primary="Check-in Vehicle" />
          </ListItem>

          <ListItem button component={RouterLink} to="/help-users">
            <ListItemIcon>
              <AssistWalkerIcon />
            </ListItemIcon>
            <ListItemText primary="Help Users" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
