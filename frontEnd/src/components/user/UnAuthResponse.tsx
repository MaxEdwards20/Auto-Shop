import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const UnAuthResponse = () => {
  const navigate = useNavigate();
  return (
    <div className="root">
      <Typography variant="h5" className="title p-3">
        Please login to access reservations
      </Typography>
      <button
        onClick={() => {
          navigate("/account/login");
        }}
      >
        Log In
      </button>
    </div>
  );
};
