import { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { UserType } from "../types/UserTypes";
import { createUser } from "../urls";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (userData: {
    email: string;
    password: string;
    balance: number;
    birthday: string;
    age: number;
    name: string;
  }) => void;
}

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(0);
  const [birthday, setBirthday] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isAuthenticated, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    let url = createUser;
    console.log(url);
    const submitData = async () => {
      console.log("Submitting the user data");
      const data = {
        email,
        password,
        balance,
        birthday,
        name,
        phoneNumber,
      };
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let json = await res.json();
      console.log(res);
      if (res.status == 200) {
        // return 200 if logged in, return 401 if unauthorized
        const userType: UserType = json.userType;
        login(userType);
        // Redirect to home page after signing in

        // const navigate = useNavigate();
        // navigate("/home");
      } else {
        setErrorMessage(json.result);
      }
    };
    submitData();
  };

  return (
    <Card className="m-2">
      <Form.Label> Sign Up Here!</Form.Label>
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

      <Form.Group controlId="formBasicBalance">
        <Form.Label>Initial balance</Form.Label>
        <Form.Control
          type="number"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
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
      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
    </Card>
  );
}
