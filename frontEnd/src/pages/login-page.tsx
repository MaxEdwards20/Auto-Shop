import { LoginForm } from "../components/user/LoginForm";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});

const LoginPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
