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

export const UserDrawer = ({ open, onClose }: DrawerProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={classes.list} role="presentation">
        <List>
          <DrawerBaseList></DrawerBaseList>
        </List>
      </div>
    </Drawer>
  );
};
