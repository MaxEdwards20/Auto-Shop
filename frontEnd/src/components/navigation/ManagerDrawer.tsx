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

export const ManagerDrawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleUpdateUserClick = () => {
    navigate("/updateUser");
    onClose();
  };

  const handlePurchaseVehicleClick = () => {
    navigate("/purchaseVehicle");
    onClose();
  };

  const handlePayEmployeeClick = () => {
    navigate("/payEmployee");
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={classes.list} role="presentation">
        <List>
          <ListItem button onClick={handleUpdateUserClick}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Update User" />
          </ListItem>
          <ListItem button onClick={handlePurchaseVehicleClick}>
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Purchase Vehicle" />
          </ListItem>
          <ListItem button onClick={handlePayEmployeeClick}>
            <ListItemIcon>
              <Payment />
            </ListItemIcon>
            <ListItemText primary="Pay Employee" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
