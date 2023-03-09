import { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { UserPermission } from "../types/DataTypes";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { api, setNewUser } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleSubmit = () => {
    setErrorMessage("");
    if (!(email && password && name && phoneNumber)) {
      setErrorMessage("Please enter all fields");
      return;
    }
    const data = { email, password, name, phoneNumber };
    api.createUser(data).then((user) => {
      setErrorMessage("Creating account...");
      if (!user) {
        setErrorMessage("Invalid email or password.");
        return;
      }
      setNewUser(user);
      setTimeout(() => {
        setErrorMessage("Redirecting to home page...");
        navigator("/home");
      }, 1000);
    });
  };

  return (
    <Card className="m-2">
      <Typography> Sign Up Here!</Typography>

      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="m-2"
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>

      {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
    </Card>
  );
}
