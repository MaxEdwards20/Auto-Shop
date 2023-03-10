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

import { transactionHandlerProps } from "../vehicle/VehicleCard";

const handleSale = ({
  vehicles,
  setNewUser,
  setNewVehicles,
  api,
  vehicle,
  user,
}: transactionHandlerProps) => {
  // vehicle is sold, so remove it from the list of vehicles
  api.sellVehicle(vehicle.id, user.id).then((vehicle) => {
    if (!vehicle) {
      return;
    }
    const newVehicles = vehicles.filter((v) => v.id !== vehicle.id);
    setNewVehicles(newVehicles);
  });
  // Update money for manager and update UI
  api.addMoneyToManager(user.id, vehicle.purchasePrice).then((user) => {
    if (!user) {
      return;
    } else {
      setNewUser(user);
    }
  });
};

type ViewPurchasedVehiclesProps = {
  vehicles: Vehicle[];
};

export const ViewPurchasedVehicles = ({
  vehicles,
}: ViewPurchasedVehiclesProps) => {
  return (
    <>
      <Grid container spacing={2}>
        {vehicles.map((vehicle) => (
          <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
            <VehicleCard
              vehicle={vehicle}
              handleTransaction={handleSale}
              type="sell"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
