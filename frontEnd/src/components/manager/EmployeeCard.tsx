import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { formatCurrency } from "../../hooks/miscFunctions";
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
  const [totalDue, setTotalDue] = useState(
    Math.round(employee.hoursOwed * employee.wage * 100) / 100
  );
  const [counter, setCounter] = useState(0);

  const [amount, setAmount] = useState<number>(totalDue);
  const { user } = useContext(UserContext);

  // write a function to round a number to 2 decimal places
  const round = (num: number) => {
    return Math.round(num * 100) / 100;
  };

  const handlePay = () => {
    onPayEmployee(employee, round(amount));

    setTotalDue((totalDue) => totalDue - round(amount));
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
            label="Total Due"
            type="text"
            value={formatCurrency(totalDue)}
            disabled
            className={classes.textField}
          />
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => {
              const newAmount = parseFloat(e.target.value);
              if (newAmount > totalDue) {
                setAmount(totalDue);
              } else {
                setAmount(newAmount);
              }
            }}
            className={classes.textField}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePay}
            disabled={
              Math.round(employee.hoursOwed) <= 0 ||
              Math.round(user.balance) < Math.round(totalDue)
            }
            fullWidth
          >
            Pay Employee {formatCurrency(amount)}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
