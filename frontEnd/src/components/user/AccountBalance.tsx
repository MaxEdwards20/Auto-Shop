import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import { formatCurrency } from "../../hooks/miscFunctions";

import { Card, TextField, Button, Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

type AccountBalanceProps = {
  classes: ClassNameMap;
};

export const AccountBalance = ({ classes }: AccountBalanceProps) => {
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
    <Card>
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
    </Card>
  );
};
