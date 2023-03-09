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
  const [amountToAdd, setAmountToAdd] = useState<number>(0);
  // User is signed in
  checkUserAndRedirect();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleAmountToAddChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      setAmountToAdd(value);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUserDepositFunds = () => {
    if (amountToAdd <= 0) {
      return;
    }
    api.addMoneyToUser(user.id, amountToAdd).then((updateUser) => {
      if (!updateUser) {
        return;
      }
      addMoney(amountToAdd);
      setAmountToAdd(0);
    });
  };

  return (
    <div className={classes.root}>
      <Stack direction="row" spacing={50}>
        <Typography variant="h5" className={classes.title}>
          Welcome, {user.name}!
        </Typography>
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
      <Typography variant="subtitle1" className="m-2 p-3">
        Your current balance is: {formatCurrency(user.balance)}
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="amount"
          type="number"
          variant="outlined"
          className={classes.textField}
          value={amountToAdd}
          onChange={handleAmountToAddChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleUserDepositFunds}
        >
          Add Funds
        </Button>
      </form>
      <UpcomingReservationsDashboard
        classes={classes}
      ></UpcomingReservationsDashboard>
    </div>
  );
};

export default Dashboard;
