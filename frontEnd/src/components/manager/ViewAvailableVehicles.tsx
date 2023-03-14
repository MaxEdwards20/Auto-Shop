import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { VehicleContext } from "../../contexts/VehicleContext";
import { VehicleCard } from "../vehicle/VehicleCard";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { Vehicle, User } from "../../types/DataTypes";
import { Grid } from "@material-ui/core";
import { json } from "react-router-dom";
import { Api } from "../../lib/api";
import { transactionHandlerProps } from "../vehicle/VehicleCard";

const handlePurchase = ({
  vehicles,
  setNewUser,
  setNewVehicles,
  api,
  vehicle,
  user,
}: transactionHandlerProps) => {
  // vehicle is new, so add it to vehicle list
  api.purchaseVehicle(vehicle.id, user.id).then((vehicle) => {
    if (!vehicle) {
      return;
    }
    // Update the state of the vehicles list
    const newVehicles = [...vehicles, vehicle];
    setNewVehicles(newVehicles);
  });
  // Update money for manager and update UI
  api.removeMoneyFromManager(user.id, vehicle.purchasePrice).then((user) => {
    if (!user) {
      return;
    } else {
      setNewUser(user);
    }
  });
};

type ViewAvailableVehiclesProps = {
  vehicles: Vehicle[];
};

export const ViewAvailableVehicles = ({
  vehicles,
}: ViewAvailableVehiclesProps) => {
  return (
    <>
      <Typography></Typography>
      <Typography></Typography>
      <Grid container spacing={2}>
        {vehicles.map((vehicle) => (
          <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
            <VehicleCard
              type="purchase"
              vehicle={vehicle}
              handleTransaction={handlePurchase}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
