import React, { useContext, useEffect, useState } from "react";
import { User } from "../../types/DataTypes";
import { UserContext } from "../../contexts/UserContext";
import { EmployeeCard } from "./EmployeeCard";
import { Typography, Grid, Card } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { checkUserIsManagerAndRedirect } from "../../hooks/validationHooks";
import { AccountBalance } from "../user/AccountBalance";
import { Box } from "@mui/system";

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
  card: {
    padding: "16px",
    margin: "16px",
    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
  },
  header: {
    margin: "16px auto auto 16px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
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

export const ManagerPayEmployees = () => {
  checkUserIsManagerAndRedirect();
  const { api, user: manager, subtractMoney } = useContext(UserContext);
  const [employees, setEmployees] = useState<User[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    api.getAllUsers(manager.id).then((usersWithRes) => {
      const users = usersWithRes.map((userWithRes) => userWithRes.user);
      const employees = users.filter((user) => user.permission === "employee");
      setEmployees(employees);
    });
  }, []);

  const handlePayment = (employee: User, amount: number) => {
    const totalPay = employee.hoursOwed * employee.wage;
    api.payEmployee(employee.id, amount, manager.id).then((updatedEmployee) => {
      if (!updatedEmployee) {
        return;
      }
      // update users
      const newEmployees = employees.map((oldEmployee) => {
        if (oldEmployee.id === employee.id) {
          return updatedEmployee;
        }
        return oldEmployee;
      });

      setEmployees(newEmployees);

      // Remove money from manager (the user)
      api.removeMoneyFromUser(manager.id, amount).then(() => {
        subtractMoney(amount);
      });
    });
    setTotalPaid(totalPaid + totalPay);
  };

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Payroll Management
      </Typography>
      <Card className={classes.card}>
        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="subtitle1">Total Paid: ${totalPaid}</Typography>

          <Typography variant="subtitle1">
            Total Employees: {employees.length}
          </Typography>
          <AccountBalance></AccountBalance>
        </Box>
      </Card>

      <Grid container spacing={3}>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.name}
            employee={employee}
            onPayEmployee={handlePayment}
          />
        ))}
      </Grid>
    </>
  );
};
