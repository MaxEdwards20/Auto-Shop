import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  DirectionsCar as CarIcon,
  EventSeat as ReservationIcon,
  AccountCircle as AccountIcon,
} from "@material-ui/icons";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ReportIcon from "@mui/icons-material/Report";

export const DrawerBaseList = () => {
  const { user } = useContext(UserContext);
  return (
    <>
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
      {user.isAuthenticated && (
        <>
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
          <ListItem button component={RouterLink} to="/user/ethics-violation">
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Ethics Violation" />
          </ListItem>
        </>
      )}

      {user.isAuthenticated ? (
        // logout component is on the dashboard
        <ListItem button divider component={RouterLink} to="/account/dashboard">
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      ) : (
        <>
          <ListItem button component={RouterLink} to="/account/create">
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Create Account" />
          </ListItem>
          <ListItem button divider component={RouterLink} to="/account/login">
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </>
      )}
    </>
  );
};
