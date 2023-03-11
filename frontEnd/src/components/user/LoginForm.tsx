import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Card, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    width: "100%",
    margin: "0 auto",
    padding: 32,
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

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const { setNewUser, api } = useContext(UserContext);
  const classes = useStyles();
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

  const handleCreateAccount = () => {
    navigate("/account/create");
  };

  return (
    <Card className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Login Here
      </Typography>
      <TextField
        label="Email"
        type="text"
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
        className={classes.button}
      >
        Login
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleCreateAccount()}
        className={classes.button}
      >
        Create Account
      </Button>
      {userMessage && <div className={classes.input}>{userMessage}</div>}
    </Card>
  );
};
