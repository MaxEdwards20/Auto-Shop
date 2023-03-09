import React, { useContext, useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Card,
  CardGroup,
  FloatingLabel,
} from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {  setNewUser, api } = useContext(AuthContext);
  const [userMessage, setUserMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setUserMessage("");
    api.loginUser({ email, password }).then((user) => {
      setUserMessage("Logging in...");
      if (!user) {
        setUserMessage("Error, wrong email and password. Please try again.");
        return;
      }
      setNewUser(user);
      setTimeout(() => {
        navigate("/account/dashboard");
      }, 1000);
    });
  };

  return (
    <Card>
      <div className="m-4">
        <h3>Email:</h3>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="m-4">
        <h3>Password:</h3>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button type="submit" className="m-4" onClick={() => handleSubmit()}>
        Login
      </Button>
      {userMessage && <div className="m-2">{userMessage}</div>}
    </Card>
  );
}
export default LoginPage;
