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

type ReserveModalProps = {
  vehicle: Vehicle;
  handleCloseModal: () => void;
  user: User;
  showModal: boolean;
  startDate: Date;
  endDate: Date;
};

export const ReserveModal = ({
  vehicle,
  handleCloseModal,
  user,
  showModal,
  startDate,
  endDate,
}: ReserveModalProps) => {
  const totalCost = differenceInDays(endDate, startDate) * vehicle.pricePerDay;
  const { api } = useContext(AuthContext);
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();
  const handleReserveClick = () => {
    if (user.balance < totalCost) {
      setUserMessage("Insufficent Funds");
      return;
    }
    api
      .createReservation(user.id, vehicle.id, startDate, endDate)
      .then((response) => {
        if (response) {
          user.balance -= totalCost;
          handleCloseModal();
        } else {
          console.log("Error creating reservation");
        }
      });
  };
  return (
    <Dialog open={showModal} onClose={handleCloseModal}>
      <DialogTitle>{vehicle.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Price per day: ${vehicle.pricePerDay}
        </DialogContentText>
        <DialogContentText>
          Price for the entire reservation: ${totalCost}
        </DialogContentText>
        <DialogContentText>
          Your account balance: ${user.balance}
        </DialogContentText>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Reserve
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          {userMessage && (
            <DialogContentText>
              {userMessage}{" "}
              <Button
                onClick={() => {
                  navigate("/account/dashboard");
                }}
              >
                Add Funds
              </Button>
            </DialogContentText>
          )}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
