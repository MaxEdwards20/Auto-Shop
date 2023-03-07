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
import Divider from "@mui/material/Divider";

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
  const [amountToAdd, adjustedAmount] = useState<number>(0);

  const navigate = useNavigate();
  const { api } = useContext(AuthContext);

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
  const [balance, setBalance] = useState<number>(user.balance);
  const { name, reservations } = user;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      adjustedAmount(value);
    }
  };

  const handleAddMoney = () => {
    api.addMoneyToUser(user.id, amountToAdd).then((user) => {
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
          value={amountToAdd}
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
      <Divider>
        <Typography variant="h6">Upcoming Reservations</Typography>
      </Divider>
      <List className={classes.list}>
        {reservations ? (
          reservations.map((reservation, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${reservation.startDate} to ${reservation.endDate}`}
                secondary={reservation.amountDue}
              />
            </ListItem>
          ))
        ) : (
          <>
            <Typography align="center">No upcoming reservations</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => navigate("/reservations")}
            >
              Create Reservation
            </Button>
          </>
        )}
      </List>
    </div>
  );
};

export default Dashboard;
