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

import { Container } from "@material-ui/core";

export const ManagerPurchaseVehicle = () => {
  const { api, user } = useContext(UserContext);
  const { vehicles: purchasedVehicles } = useContext(VehicleContext);
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const getUnpurchasedVehicles = async () => {
      const res = await api.getAllVehicles();
      const unpurchasedVehicles = res.filter((vehicle) => !vehicle.isPurchased);
      setAvailableVehicles(unpurchasedVehicles);
    };
    getUnpurchasedVehicles();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Owned Vehicles</Typography>
          <Typography>Account Balance: ${user.balance}</Typography>
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
