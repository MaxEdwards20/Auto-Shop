import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

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

export function checkUserIsEmployeeAndRedirect() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user.isAuthenticated || user.permission !== "employee") {
      navigate("/unauthorized");
    }
  }, []);
}
