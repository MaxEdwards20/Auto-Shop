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
  const { isAuthenticated, setNewUser, api } = useContext(AuthContext);
  const [signInFailed, setSignInFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    api.loginUser({ email, password }).then((user) => {
      if (!user) {
        setSignInFailed(true);
        return;
      }
      setNewUser(user);
      setTimeout(() => {
        navigate("/account/dashboard");
      }, 1000);
    });
  };

  return (
    <div>
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
      </Card>
      <div>
        {isAuthenticated ? (
          <div>Welcome!</div>
        ) : (
          !signInFailed && <p className="m-2"> Please log in to proceed </p>
        )}
      </div>
      <div>
        {signInFailed ? (
          <div className="m-2">
            {" "}
            Error, wrong email and password. Please try again.{" "}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
export default LoginPage;
