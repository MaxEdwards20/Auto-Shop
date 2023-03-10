import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { User } from "../../types/DataTypes";

interface EmployeeCardProps {
  employee: User;
  onPayEmployee: (employee: User, amount: number) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

export const EmployeeCard = ({
  employee,
  onPayEmployee,
}: EmployeeCardProps) => {
  const classes = useStyles();
  const [amount, setAmount] = useState<number>(0);

  const handlePay = () => {
    onPayEmployee(employee, amount);
    setAmount(0);
  };

  return (
    <Grid item xs={12} md={4} key={employee.id}>
      <Card className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h6">{employee.name}</Typography>
        </div>
        <CardContent className={classes.content}>
          <TextField
            label="Hours Owed"
            type="number"
            value={employee.hoursOwed}
            disabled
            className={classes.textField}
          />
          <TextField
            label="Wage"
            type="number"
            value={employee.wage}
            disabled
            className={classes.textField}
          />
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className={classes.textField}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePay}
            disabled={employee.hoursOwed === 0}
            fullWidth
          >
            Pay Employee ${employee.hoursOwed * employee.wage}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
