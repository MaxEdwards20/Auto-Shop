import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types/DataTypes";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import { Stack, styled, Paper, Grid } from "@mui/material";

export default function ManagerUpdateUser() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { api, user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      api.getAllUsers(user.id).then((users) => {
        if (!users) {
          return;
        }
        console.log("received users: ", users);
        let newUsers: User[] = [];
        users.map((newUser) => {
          if (newUser.user.id !== user.id) {
            newUsers.push(newUser.user);
          }
        });
        setAllUsers(newUsers);
      });
    }
  }, []);

  const handleStatusChange = (
    id: number,
    newPermission: User["permission"]
  ) => {
    api.updateUserPermission(id, newPermission).then((updatedUser) => {
      if (!updatedUser) {
        return;
      }
      console.log("updated user: ", updatedUser);
      let newUsers: User[] = [];
      allUsers.map((newUser) => {
        if (newUser.id !== id) {
          newUsers.push(newUser);
        } else {
          newUsers.push(updatedUser);
        }
      });
      setAllUsers(newUsers);
    });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#add8e6",
    padding: theme.spacing(1),
    textAlign: "center",
    fontSize: "20px",
    fontFamily: "inherit",
  }));

  return (
    // TODO: Change the button options based on what the user already is
    <div>
      <Typography variant="h5">Current Users</Typography>
      <Grid container spacing={2}>
        {allUsers.map((grabbedUser) => (
          <Grid item xs={12} sm={6} key={grabbedUser.id}>
            <Stack>
              <Item>Name: {grabbedUser.name}</Item>
              <Item>Current Permission: {grabbedUser.permission}</Item>
              <Item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusChange(grabbedUser.id, "employee")}
                >
                  Set Employee
                </Button>
              </Item>
              <Item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusChange(grabbedUser.id, "user")}
                >
                  Set User
                </Button>
              </Item>
              <Item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusChange(grabbedUser.id, "admin")}
                >
                  Set Admin
                </Button>
              </Item>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
