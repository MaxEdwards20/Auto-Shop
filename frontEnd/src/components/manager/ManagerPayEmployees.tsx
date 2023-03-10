import React, { useContext, useEffect, useState } from "react";
import { User } from "../../types/DataTypes";
import { UserContext } from "../../contexts/UserContext";
import { EmployeeCard } from "./EmployeeCard";
import { Typography, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { checkUserIsManagerAndRedirect } from "../../hooks/validationHooks";

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
    margin: "16px 0",
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
  const { api, user, subtractMoney } = useContext(UserContext);
  const [employees, setEmployees] = useState<User[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    api.getAllUsers(user.id).then((usersWithRes) => {
      const users = usersWithRes.map((userWithRes) => userWithRes.user);
      const employees = users.filter((user) => user.permission === "employee");
      setEmployees(employees);
    });
  }, []);

  const handlePayment = (user: User, amount: number) => {
    const totalPay = user.hoursOwed * user.wage;
    api.addMoneyToUser(user.id, amount).then((updatedUser) => {
      if (!updatedUser) {
        return;
      }
      // update users
      setEmployees((prev) => {
        const newEmployees = prev.map((employee) => {
          if (employee.id === user.id) {
            return updatedUser;
          }
          return employee;
        });
        return newEmployees;
      });

      // Remove money from manager (the user)
      api.removeMoneyFromUser(user.id, amount).then(() => {
        subtractMoney(amount);
      });
    });
    setTotalPaid(totalPaid + totalPay);
  };

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Payroll Manager
      </Typography>
      <Grid container spacing={3}>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.name}
            employee={employee}
            onPayEmployee={handlePayment}
          />
        ))}
      </Grid>
      <Typography variant="body1" className={classes.header}>
        Total Paid: ${totalPaid}
      </Typography>
      <Typography variant="body1" className={classes.header}>
        Manager Balance: <span>${user.balance}</span>
      </Typography>
      <Typography variant="body1" className={classes.header}>
        Total Employees: {employees.length}
      </Typography>
    </>
  );
};
