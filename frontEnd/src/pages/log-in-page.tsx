import React, { useContext, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { UserType } from "../types/UserTypes";
import { loginUser } from "../urls";
import { useNavigate } from "react-router-dom";
import { loginUserBody } from "../dto/loginuser";

function LoginPage(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login } = useContext(AuthContext);
  const [signInFailed, setSignInFailed] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let url = loginUser;
    async () => {
      const data = { username, password };
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let json: loginUserBody = await res.json();
      if (res.status == 200) {
        // return 200 if logged in, return 401 if unauthorized
        const userType: UserType = json.userType;
        login(userType);
        // Redirect to home page after signing in
        const navigate = useNavigate();
        navigate("/");
      } else {
        setSignInFailed(true);
        setPassword("");
      }
    };
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="m-4">
          <Form.Label>Username:</Form.Label>
          <FormControl
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="m-4">
          <Form.Label>Password:</Form.Label>
          <FormControl
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="m-4">
          Login
        </Button>
      </Form>
      <div>
        {isAuthenticated ? (
          <div>Welcome!</div>
        ) : (
          <p className="m-2"> Please log in to proceed </p>
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
