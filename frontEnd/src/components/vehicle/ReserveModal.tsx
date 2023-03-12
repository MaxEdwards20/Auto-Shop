import { User, Vehicle } from "../../types/DataTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../hooks/miscFunctions";
import { Api } from "../../lib/api";
import UserContext from "../../contexts/UserContext";

type ReserveModalProps = {
  vehicle: Vehicle;
  handleCloseModal: () => void;
  showModal: boolean;
  startDate: Date;
  endDate: Date;
  handleReserveClick: (isInsured: boolean) => void;
};

export const ReserveModal = ({
  vehicle,
  handleCloseModal,
  showModal,
  startDate,
  endDate,
  handleReserveClick,
}: ReserveModalProps) => {
  const [totalCost, setTotalCost] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const [reserved, setReserved] = useState(false);
  const [isInsured, setIsInsured] = useState(false);
  const { api, user } = useContext(UserContext);
  const navigate = useNavigate();

  const getTotalCostNoInsurance = () => {
    api
      .calculateReservationCost(startDate, endDate, vehicle.pricePerDay)
      .then((res) => {
        if (!res) {
          console.error("Error calculating total cost. Please try again.");
        } else {
          setTotalCost(res);
        }
      });
    setTotalCost(vehicle.pricePerDay * differenceInDays(endDate, startDate));
  };

  useEffect(() => {
    getTotalCostNoInsurance();
  }, [vehicle, startDate, endDate]);
  return (
    <Dialog open={showModal} onClose={handleCloseModal}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsInsured(true);
          }}
          disabled={user.balance < totalCost || reserved}
        >
          Add insurance for {formatCurrency(totalCost)}?
        </Button>

        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              handleReserveClick(isInsured);
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
