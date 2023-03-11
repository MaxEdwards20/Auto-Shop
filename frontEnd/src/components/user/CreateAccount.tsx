import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    space: 2,
    maxWidth: 800,
    width: "100%",
    margin: "auto",
    marginTop: 32,
    marginBottom: 32,
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 32,
    width: "100%",
    maxWidth: 400,
  },
  button: {
    marginTop: 32,
    width: "100%",
    maxWidth: 400,
  },
  title: {
    marginBottom: 32,
  },
});

export default function CreateAccountForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { api, setNewUser } = useContext(UserContext);
  const classes = useStyles();
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
        setErrorMessage("That email is already in use.");
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
    <Card className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Sign Up
      </Typography>
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={classes.input}
      />
      <TextField
        label="Email address"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={classes.input}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className={classes.input}
      />
      <TextField
        label="Phone Number"
        type="text"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        className={classes.input}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
        className={classes.button}
      >
        Submit
      </Button>
      {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
    </Card>
  );
}
