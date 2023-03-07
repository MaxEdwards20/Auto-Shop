import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Rentals } from "../DummyData";
import CarListing from "../components/CarListingReservation";
import { Vehicle } from "../types/DataTypes";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function BasicDateTimePicker() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [minEndDate, setMinEndDate] = useState<Dayjs | null>(dayjs());
  const [carList, setCarList] = useState<Vehicle[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const { user, api } = useContext(AuthContext);

  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  const today = dayjs(`${cYear}-${cMonth}-${cDay}`);

  useEffect(() => {
    setStartDate(today);
    setEndDate(today);
    setMinEndDate(today);
  }, []);

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
              setEndDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <button
          className="dateButton"
          onClick={() => {
            //Make a POST request to reserve a vehicle for these days
            const start = startDate?.toDate();
            const end = endDate?.toDate();
            api.getAvailableVehicles(start, end).then((cars) => {
              if (!cars) {
                setUserMessage("No cars available for those dates");
                return;
              }
              setCarList(cars);
            });
            // setCarList(Rentals); // Dummy data
          }}
        >
          Show Me The Vehicles!
        </button>
      </div>
      <div className="carList">
        <ul>
          {carList.map((rental) => (
            <div className="reservationContainer">
              <CarListing car={rental} />
            </div>
          ))}
        </ul>
      </div>
      {userMessage && <p>{userMessage}</p>}
    </div>
  );
}

export function ReservationPage() {
  return <h1>Welcome to the Reservation Page</h1>;
}
// export default ReservationPage;
