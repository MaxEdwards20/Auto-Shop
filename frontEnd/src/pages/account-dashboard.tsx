import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Vehicle } from "../types/DataTypes";
import { UnAuthDashboard } from "../components/user/UnAuthDashboard";
import { UpcomingReservationsDashboard } from "../components/user/UpcomingReservationsDashboard";
import { formatCurrency } from "../hooks/miscFunctions";
import { VehicleContext } from "../contexts/VehicleContext";
import { checkUserAndRedirect } from "../hooks/validationHooks";
import { AccountBalance } from "../components/user/AccountBalance";
import { HelpButton } from "../components/user/HelpButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(4),
    width: "100%",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Dashboard = () => {
  const { user, api, logout, addMoney } = useContext(UserContext);
  const { vehicles } = useContext(VehicleContext);
  // User is signed in
  checkUserAndRedirect();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <Stack direction="row" spacing={30}>
        <Stack direction="column">
          <Typography variant="h5" className={classes.title}>
            Welcome, {user.name}!
          </Typography>
          <HelpButton />
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          size="small"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </Stack>
      <AccountBalance />

      <UpcomingReservationsDashboard
        classes={classes}
      ></UpcomingReservationsDashboard>
    </div>
  );
};

export default Dashboard;
