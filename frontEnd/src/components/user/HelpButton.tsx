import React, { useState, useContext } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

export const HelpButton = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const { api, user, setNewUser } = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const onHelpRequested = (location: string) => {
    api.userNeedsHelp(user.id, true, location).then((res) => {
      if (!res) {
        alert("Error requesting help");
      } else {
        alert("Help requested");
        // update the state
        let newUser = user;
        newUser.needHelp = true;
        setNewUser(newUser);
      }
    });
  };

  const handleHelpRequested = () => {
    onHelpRequested(location);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleOpen}
        disabled={user.needHelp}
      >
        {user.needHelp ? "Help has been requested" : "Request Help"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request Help</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your location and click "Yes, I need help" to request
            assistance from an employee.
          </DialogContentText>
          <form className={classes.form}>
            <TextField
              className={classes.formField}
              label="Location"
              variant="outlined"
              value={location}
              onChange={handleLocationChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleHelpRequested} color="primary" autoFocus>
            Yes, I need help
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
