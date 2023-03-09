import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/AuthContext";

export function checkUserAndRedirect() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/unauthorized");
    }
  }, []);
}

export function checkUserIsManagerAndRedirect() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user.isAuthenticated || user.permission != "admin") {
      navigate("/unauthorized");
    }
  }, []);
}
