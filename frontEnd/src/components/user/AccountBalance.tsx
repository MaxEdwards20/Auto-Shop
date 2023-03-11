import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import { formatCurrency } from "../../hooks/miscFunctions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import { Card, TextField, Button, Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

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

export const AccountBalance = () => {
  const classes: ClassNameMap = useStyles();
  const { user, api, addMoney } = useContext(UserContext);
  const [amountToAdd, setAmountToAdd] = useState<number>(0);

  const handleAmountToAddChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      setAmountToAdd(value);
    }
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
    <Card className={classes.root} style={{ maxWidth: "500px" }}>
      <Typography variant="subtitle1" className="m-2 p-3">
        Your current balance is: {formatCurrency(user.balance)}
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          <OutlinedInput
            id="amount"
            type="number"
            value={amountToAdd}
            startAdornment={
              <InputAdornment color="#add8e6" position="start">
                $
              </InputAdornment>
            }
            onChange={handleAmountToAddChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleUserDepositFunds}
          style={{ marginLeft: "10px" }}
        >
          Add Funds
        </Button>
      </form>
    </Card>
  );
};
