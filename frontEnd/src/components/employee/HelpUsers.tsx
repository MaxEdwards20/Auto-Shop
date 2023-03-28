import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { checkUserIsEmployeeAndRedirect } from "../../hooks/validationHooks";
import { User } from "../../types/DataTypes";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  list: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const HelpUsers = () => {
  checkUserIsEmployeeAndRedirect();
  const classes = useStyles();
  const [usersThatNeedHelp, setUsersThatNeedHelp] = useState<User[]>([]);
  const { api } = useContext(UserContext);

  useEffect(() => {
    api.allUsersNeedHelp().then((combo) => {
      if (!combo) {
        console.error("Error getting users that need help.");
      } else {
        const users = combo.map((user) => user.user);
        setUsersThatNeedHelp(users);
      }
    });
  }, []);

  const handleUserHelped = async (user: User) => {
    const res = await api.userNeedsHelp(user.id, false, "Helped");
    if (!res) {
      console.error("Error marking user as helped.");
    }
    // update state
    setUsersThatNeedHelp(usersThatNeedHelp.filter((u) => u.id !== user.id));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Users Who Need Help</Typography>
      {usersThatNeedHelp.length === 0 ? (
        <Typography variant="body1">No users need help.</Typography>
      ) : (
        <List className={classes.list}>
          {usersThatNeedHelp.map((user: User) => (
            <ListItem key={user.phoneNumber}>
              <ListItemText
                primary={user.name}
                secondary={`Phone Number: ${user.phoneNumber} --- Location: ${user.location}`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUserHelped(user)}
              >
                Mark as Helped
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
