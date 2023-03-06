import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { ReservationInfo } from "../types/DataTypes";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(4),
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
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  if (!user) {
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          Pleased to see you!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/account/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/account/create"
        >
          Create Account
        </Button>
      </div>
    );
  }

  const [amount, setAmount] = useState<number>(user.balance);
  const [balance, setBalance] = useState<number>(user.balance);
  const { name, reservations } = user;
  const navigate = useNavigate();
  const { api } = useContext(AuthContext);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      setAmount(value);
    }
  };

  const handleAddMoney = () => {
    console.log("Adding money to account");
    api.addMoneyToUser(user.id, amount).then((user) => {
      if (!user) {
        return;
      }
      setBalance(user.balance);
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Welcome, {name}!
      </Typography>
      <Typography variant="subtitle1" className="m-2 p-3">
        Your current balance is: ${balance.toFixed(2)}
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="amount"
          label="Add money to your account"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          className={classes.textField}
          value={amount}
          onChange={handleAmountChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAddMoney}
        >
          Add
        </Button>
      </form>
      <Typography variant="h6">Upcoming Reservations</Typography>
      {/* <List className={classes.list}>
        {reservations.map((reservation, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${reservation.startDate} to ${reservation.endDate}`}
              secondary={reservation.amountDue}
            />
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export default Dashboard;
