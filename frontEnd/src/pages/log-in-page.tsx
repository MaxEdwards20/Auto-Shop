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
import { UserPermission } from "../types/UserType";
import { loginUser } from "../urls";
import { useNavigate } from "react-router-dom";
import { LoginUserBody } from "../dto/apiTypes";

function LoginPage(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login } = useContext(AuthContext);
  const [signInFailed, setSignInFailed] = useState(false);

  const handleSubmit = () => {
    console.log("Handling submit");
    let url = loginUser;
    const grabData = async () => {
      const data = { email, password };
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let json: LoginUserBody = await res.json();
      console.log(json);
      if (res.status == 200) {
        // return 200 if logged in, return 401 if unauthorized
        const userType: UserPermission = json.userType;
        login(userType);
        // Redirect to home page after signing in
        const navigate = useNavigate();
        navigate("/");
      } else {
        console.error(res);
        setSignInFailed(true);
        setPassword("");
      }
    };
    grabData();
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
