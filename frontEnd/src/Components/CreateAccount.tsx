import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { UserType } from "../types/UserTypes";
import { createAccount } from "../urls";
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
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  const [userType, setuserType] = useState("user");
  const { isAuthenticated, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = createAccount;
    async () => {
      const data = { email, password, balance, birthday, age, name, userType };
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let json = await res.json();
      if (res.status == 200) {
        // return 200 if logged in, return 401 if unauthorized
        const userType: UserType = json.userType;
        login(userType);
        // Redirect to home page after signing in
        const navigate = useNavigate();
        navigate("/");
      } else {
        setErrorMessage(json.result);
      }
    };
  };

  return (
    <Form onSubmit={handleSubmit} className="m-2">
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
          placeholder="0"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
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

      <Form.Group controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="0"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
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

      <Button variant="primary" type="submit" className="m-2">
        Submit
      </Button>
    </Form>
  );
}
