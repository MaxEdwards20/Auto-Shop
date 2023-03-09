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
import { UserContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, setupManager } from "../hooks/miscFunctions";

type ReserveModalProps = {
  vehicle: Vehicle;
  handleCloseModal: () => void;
  showModal: boolean;
  startDate: Date;
  endDate: Date;
  ref: React.ForwardedRef<unknown>;
};

export const ReserveModal = ({
  vehicle,
  handleCloseModal,
  showModal,
  startDate,
  endDate,
  ref,
}: ReserveModalProps) => {
  const { api, user, manager, setNewUser } = useContext(UserContext);
  const [userMessage, setUserMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(user.balance);
  const navigate = useNavigate();

  const getTotalCost = () => {
    const diffDays = differenceInDays(endDate, startDate);
    let estimatedCost = diffDays * vehicle.pricePerDay;
    if (estimatedCost === 0) {
      setTotalCost(vehicle.pricePerDay);
    } else {
      setTotalCost(estimatedCost);
    }
  };

  useEffect(() => {
    getTotalCost();
  }, [startDate, endDate]);

  const removeFunds = () => {
    api.removeMoneyFromUser(user.id, totalCost).then((user) => {
      if (!user) {
        setUserMessage("Error updating user balance. Please try again.");
      } else {
        setDisplayBalance(displayBalance - totalCost);
        setUserMessage("Reservation created successfully");
        setDisabled(true);
      }
      // now we update the manager balance because we took the money from the user
      api.addMoneyToUser(manager.id, totalCost).then((manager) => {
        if (!manager) {
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
          let newUser = { ...user };
          if (user.reservations) {
            newUser.reservations = [...user.reservations, reservation];
          } else {
            newUser.reservations = [reservation];
          }
          setNewUser(newUser);
          // update the user's reservations
          removeFunds(); // Reservation is made so update the funds available for the user
        }
      });
  };

  if (user.balance < totalCost) {
    setDisabled(true);
  }

  return (
    <Dialog open={showModal} onClose={handleCloseModal} ref={ref}>
      <DialogTitle>{vehicle.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Price per day: ${vehicle.pricePerDay}
        </DialogContentText>
        <DialogContentText>
          Price for the entire reservation: {formatCurrency(totalCost)}
        </DialogContentText>
        <DialogContentText>
          Your account balance: {formatCurrency(displayBalance)}
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
