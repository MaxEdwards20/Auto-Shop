import { UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";
import { ManagerDrawer } from "./ManagerDrawer";
import { EmployeeDrawer } from "./EmployeeDrawer";
import { UserDrawer } from "./UserDrawer";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import "./navigationStyles.css";

function NavBar() {
  const { user } = useContext(UserContext);
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);
  if (user.permission == "admin") {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerIsOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Dan's Auto Shop</Typography>
          </Toolbar>
        </AppBar>
        <ManagerDrawer
          open={isDrawerOpen}
          onClose={() => {
            setDrawerIsOpen(false);
          }}
        ></ManagerDrawer>
      </div>
    );
  } else if (user.permission == "employee") {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerIsOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Dan's Auto Shop</Typography>
          </Toolbar>
        </AppBar>
        <EmployeeDrawer
          open={isDrawerOpen}
          onClose={() => {
            setDrawerIsOpen(false);
          }}
        ></EmployeeDrawer>
      </div>
    );
  } else {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerIsOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Dan's Auto Shop</Typography>
          </Toolbar>
        </AppBar>
        <UserDrawer
          open={isDrawerOpen}
          onClose={() => {
            setDrawerIsOpen(false);
          }}
        ></UserDrawer>
      </div>
    );
  }
}

export default NavBar;
