import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { VehicleContext } from "../../contexts/VehicleContext";
import { User, Vehicle } from "../../types/DataTypes";
import { Api } from "../../lib/api";

export type transactionHandlerProps = {
  vehicles: Vehicle[];
  api: Api;
  user: User;
  setNewUser: (user: User) => void;
  setNewVehicles: (vehicles: Vehicle[]) => void;
  vehicle: Vehicle;
};

type VehicleCardProps = {
  vehicle: Vehicle;
  handleTransaction: (props: transactionHandlerProps) => void;
  type: "purchase" | "sell";
};

export const VehicleCard = ({
  vehicle,
  handleTransaction,
  type,
}: VehicleCardProps) => {
  const { api, user, setNewUser } = useContext(UserContext);
  const { vehicles, setNewVehicles } = useContext(VehicleContext);
  const [disabled, setDisabled] = useState(false);

  const titleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleClick = () => {
    setDisabled(true);
    handleTransaction({
      vehicle,
      user,
      setNewUser,
      setNewVehicles,
      api,
      vehicles,
    });
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height={200}
          image={vehicle.imageURL}
          alt={vehicle.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {vehicle.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price per day: ${vehicle.pricePerDay}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {titleCase(type)} Price ${vehicle.purchasePrice}
          </Typography>
        </CardContent>
      </CardActionArea>
      {type == "purchase" ? (
        <Button
          onClick={() => handleClick()}
          color="primary"
          variant="contained"
          disabled={disabled || user.balance < vehicle.purchasePrice}
        >
          Purchase
        </Button>
      ) : (
        <Button
          onClick={() => handleClick()}
          color="primary"
          variant="contained"
          disabled={disabled}
        >
          Sell
        </Button>
      )}
    </Card>
  );
};
