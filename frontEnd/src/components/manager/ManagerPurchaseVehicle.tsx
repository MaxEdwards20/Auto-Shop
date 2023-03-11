import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { VehicleContext } from "../../contexts/VehicleContext";
import { VehicleCard } from "../vehicle/VehicleCard";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { Vehicle, User } from "../../types/DataTypes";
import { Grid } from "@material-ui/core";
import { json } from "react-router-dom";
import { Api } from "../../lib/api";
import { Subheader } from "material-ui";
import { ViewAvailableVehicles } from "./ViewAvailableVehicles";
import { ViewPurchasedVehicles } from "./ViewPurchasedVehicles";
import { checkUserIsManagerAndRedirect } from "../../hooks/validationHooks";
import "./managerstyles.css";
import { Container } from "@material-ui/core";
import { AccountBalance } from "../user/AccountBalance";
import { formatCurrency } from "../../hooks/miscFunctions";

export const ManagerPurchaseVehicle = () => {
  checkUserIsManagerAndRedirect();
  const { api, user } = useContext(UserContext);
  const { vehicles: purchasedVehicles } = useContext(VehicleContext);
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [prevBalance, setPrevBalance] = useState(user.balance);
  const [balanceChanged, setBalanceChanged] = useState(false);

  useEffect(() => {
    const getUnpurchasedVehicles = async () => {
      const res = await api.getAllVehicles();
      const unpurchasedVehicles = res.filter((vehicle) => !vehicle.isPurchased);
      setAvailableVehicles(unpurchasedVehicles);
    };
    getUnpurchasedVehicles();
  }, []);

  useEffect(() => {
    if (user.balance !== prevBalance) {
      setPrevBalance(user.balance);
      setBalanceChanged(true);
    }
  }, [user.balance, prevBalance]);

  useEffect(() => {
    if (balanceChanged) {
      setTimeout(() => {
        setBalanceChanged(false);
      }, 1000); // reset the animation after 1 second
    }
  }, [balanceChanged]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        className={
          balanceChanged
            ? "balance-flash"
            : user.balance > prevBalance
            ? "balance-increase"
            : user.balance < prevBalance
            ? "balance-decrease"
            : ""
        }
      >
        Account Balance: {formatCurrency(user.balance)}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Owned Vehicles</Typography>

          <ViewPurchasedVehicles vehicles={purchasedVehicles} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Available for Purchase</Typography>
          <ViewAvailableVehicles vehicles={availableVehicles} />
        </Grid>
      </Grid>
    </Container>
  );
};
