import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Vehicle } from "../types/DataTypes";
import { UnAuthDashboard } from "../components/UnAuthDashboard";
import { UpcomingReservationsDashboard } from "../components/UpcomingReservationsDashboard";
import { checkUserAndRedirect, formatCurrency } from "../hooks/miscFunctions";
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
  checkUserAndRedirect();

  const classes = useStyles();
  const { user, api, logout, vehicles, setNewVehicles } =
    useContext(AuthContext);
  const [amountToAdd, adjustedAmount] = useState<number>(0);
  const navigate = useNavigate();
  // User is signed in
  const [balance, setBalance] = useState<number>(user.balance);

  useEffect(() => {
    if (vehicles.length < 1) {
      api.getAllVehicles().then((vehicles) => {
        if (!vehicles) {
          return;
        }
        setNewVehicles(vehicles);
      });
    }
  }, []);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      adjustedAmount(value);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddMoney = () => {
    if (amountToAdd <= 0) {
      return;
    }
    api.addMoneyToUser(user.id, amountToAdd).then((updateUser) => {
      if (!updateUser) {
        return;
      }
      user.balance = updateUser.balance;
      setBalance(updateUser.balance);
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
        Your current balance is: {formatCurrency(balance)}
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="amount"
          type="number"
          variant="outlined"
          className={classes.textField}
          value={amountToAdd}
          onChange={handleAmountChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAddMoney}
        >
          Add Funds
        </Button>
      </form>
      <UpcomingReservationsDashboard
        reservations={user.reservations}
        classes={classes}
      ></UpcomingReservationsDashboard>
    </div>
  );
};

export default Dashboard;
