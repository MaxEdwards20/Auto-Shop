import React, { useContext, useState } from "react";
import { ManagerContext } from "../../contexts/ManagerContext";
import { UserContext } from "../../contexts/UserContext";
import {
  TextField,
  Button,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Card,
} from "@material-ui/core";
import { checkUserIsEmployeeAndRedirect } from "../../hooks/validationHooks";
import { Typography } from "@mui/material";
import { formatCurrency } from "../../hooks/miscFunctions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto auto 20",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export const LogHours = () => {
  checkUserIsEmployeeAndRedirect();
  const { manager } = useContext(ManagerContext);
  const { user, api, addHours } = useContext(UserContext);
  const classes = useStyles();

  const [hours, setHours] = useState<number | "">("");

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHours(event.target.value as number | "");
  };

  const handleLogHours = async () => {
    const newUser = await api.employeeAddHours(
      user.id,
      hours as number,
      manager.id
    );
    if (!newUser) {
      console.error("Error logging hours");
      return;
    }
    addHours(hours as number);
    setHours("");
  };

  return (
    <Card>
      <Typography>Currently unpaid hours: {user.hoursOwed}</Typography>
      <Typography>
        Projected paycheck {formatCurrency(user.hoursOwed * user.wage)}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hours worked"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogHours}
            disabled={!hours}
          >
            Log Hours
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
