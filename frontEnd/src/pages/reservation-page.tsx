import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CarListing } from "../components/CarListingReservation";
import { Vehicle } from "../types/DataTypes";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Typography } from "@mui/material";
import { UserContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UnAuthResponse } from "../components/UnAuthResponse";
import { checkUserAndRedirect } from "../hooks/miscFunctions";

export default function ReservationPage() {
  // Initialize today's date
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  const today = dayjs(`${cYear}-${cMonth}-${cDay}`);

  // state values
  const [startDate, setStartDate] = useState<Dayjs>(today);
  const [endDate, setEndDate] = useState<Dayjs>(today);
  const [minEndDate, setMinEndDate] = useState<Dayjs | null>(dayjs());
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const { user, api } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setStartDate(today);
    setEndDate(today);
    setMinEndDate(today);
  }, []);

  checkUserAndRedirect();

  const updateAvailableVehicles = () => {
    setUserMessage("");
    const start = startDate?.toDate();
    const end = endDate?.toDate();
    api.getAvailableVehicles(start, end).then((cars) => {
      if (!cars || cars.length < 1) {
        setUserMessage("No cars available for those dates");
        return;
      }
      setAvailableVehicles(cars);
    });
  };

  return (
    <div className="root">
      <Typography variant="h5" className="title p-3">
        Select your available dates
      </Typography>
      <div className="container" id="dateContainer">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Start Date"
            value={startDate}
            minDate={today}
            onChange={(newDate) => {
              if (newDate == null) return;
              setStartDate(newDate);
              setMinEndDate(newDate);
              if (endDate != null && newDate != null && endDate < newDate) {
                setEndDate(newDate);
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="End Date"
            value={endDate}
            minDate={minEndDate}
            onChange={(newDate) => {
              if (newDate == null) return;
              setEndDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <button
          className="dateButton"
          onClick={() => updateAvailableVehicles()}
        >
          Show Me The Vehicles!
        </button>
      </div>
      <div className="carList">
        <ul>
          {availableVehicles.map((rental) => (
            <div className="reservationContainer" key={rental.id}>
              <CarListing
                updateVehicleList={updateAvailableVehicles}
                vehicle={rental}
                startDate={startDate.toDate()}
                endDate={endDate.toDate()}
              />
            </div>
          ))}
        </ul>
      </div>
      {userMessage && <p>{userMessage}</p>}
    </div>
  );
}
