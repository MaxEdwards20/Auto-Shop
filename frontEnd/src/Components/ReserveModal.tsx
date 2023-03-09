import { User, Vehicle } from "../types/DataTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { differenceInDays } from "date-fns";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnAuthResponse } from "./UnAuthResponse";
import { formatCurrency, setupManager } from "../hooks/miscFunctions";

type ReserveModalProps = {
  vehicle: Vehicle;
  handleCloseModal: () => void;
  showModal: boolean;
  startDate: Date;
  endDate: Date;
};

export const ReserveModal = ({
  vehicle,
  handleCloseModal,
  showModal,
  startDate,
  endDate,
}: ReserveModalProps) => {
  const totalCost =
    (differenceInDays(endDate, startDate) + 1) * vehicle.pricePerDay;
  const { api, user, manager, setNewManager } = useContext(AuthContext);
  if (!user) {
    return <UnAuthResponse />;
  }
  if (!manager) {
    setupManager(api, setNewManager);
  }
  const [userMessage, setUserMessage] = useState("");
  const [disabled, setDisabled] = useState(user.balance < totalCost);
  const navigate = useNavigate();

  const removeFunds = () => {
    api.removeMoneyFromUser(user.id, totalCost).then((user) => {
      if (!user) {
        setUserMessage("Error updating user balance. Please try again.");
      } else {
        user.balance = user.balance - totalCost;
        setUserMessage("Reservation created successfully");
        setDisabled(true);
      }

      // now we update the manager balance because we took the money from the user
      api.addMoneyToUser(manager.id, totalCost).then((manager) => {
        if (manager) {
          manager.balance = manager.balance + totalCost;
        } else {
          console.error("Error updating manager balance. Please try again.");
        }
      });
    });
  };

  const handleReserveClick = () => {
    if (user.balance < totalCost) {
      setUserMessage("Insufficent Funds");
      return;
    }
    api
      .createReservation(user.id, vehicle.id, startDate, endDate)
      .then((reservation) => {
        if (!reservation) {
          setUserMessage("Error creating reservation. Please try again.");
        } else {
          console.log(user.reservations);
          if (user.reservations.length > 0) {
            user.reservations = [...user.reservations, reservation];
          } else {
            user.reservations = [reservation];
          }
          // update the user's reservations
          removeFunds(); // Reservation is made so update the funds available for the user
        }
      });
  };

  return (
    <Dialog open={true} onClose={handleCloseModal}>
      <DialogTitle>{vehicle.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Price per day: ${vehicle.pricePerDay}
        </DialogContentText>
        <DialogContentText>
          Price for the entire reservation: {formatCurrency(totalCost)}
        </DialogContentText>
        <DialogContentText>
          Your account balance: ${user.balance}
        </DialogContentText>
        {userMessage && (
          <DialogContentText color="secondary">{userMessage}</DialogContentText>
        )}
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleReserveClick}
            disabled={disabled}
          >
            Reserve
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/account/dashboard");
            }}
          >
            Add Funds
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
