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
import PeopleIcon from "@mui/icons-material/People";

import { Link as RouterLink } from "react-router-dom";

import { AccountCircle, DirectionsCar, Payment } from "@material-ui/icons";
import { DrawerBaseList } from "./DrawerBaseList";
import Divider from "material-ui/Divider";

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

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={classes.list} role="presentation">
        <List>
          <DrawerBaseList></DrawerBaseList>
          <ListItem button component={RouterLink} to="/manager/users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="View Users" />
          </ListItem>
          <ListItem button component={RouterLink} to="/manager/purchase">
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Vehicle Management" />
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
