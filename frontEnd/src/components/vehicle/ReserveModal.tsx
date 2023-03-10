import { User, Vehicle } from "../../types/DataTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../hooks/miscFunctions";
import { Api } from "../../lib/api";

type ReserveModalProps = {
  vehicle: Vehicle;
  handleCloseModal: () => void;
  showModal: boolean;
  startDate: Date;
  endDate: Date;
  user: User;
  api: Api;
  handleReserveClick: () => void;
  totalCost: number;
};

export const ReserveModal = ({
  vehicle,
  handleCloseModal,
  showModal,
  startDate,
  endDate,
  handleReserveClick,
  user,
  totalCost,
}: ReserveModalProps) => {
  const [userMessage, setUserMessage] = useState("");
  const [reserved, setReserved] = useState(false);
  const navigate = useNavigate();
  return (
    <Dialog open={showModal} onClose={() => handleCloseModal()}>
      <DialogTitle>{vehicle.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Price per day: ${vehicle.pricePerDay}
        </DialogContentText>
        <DialogContentText>
          Price for the entire reservation: {formatCurrency(totalCost)}
        </DialogContentText>
        <DialogContentText>
          Your account balance: {formatCurrency(user.balance)}
        </DialogContentText>
        {userMessage && (
          <DialogContentText color="secondary">{userMessage}</DialogContentText>
        )}
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              handleReserveClick();
              setReserved(true);
            }}
            disabled={user.balance < totalCost || reserved}
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
            onClick={() => handleCloseModal()}
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
