import React, { useContext, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function LoginPage(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let url = `https://BACKEND_URL_HERE?username=${username}&pass=${password}`;
    async () => {
      let res = await fetch(url);
      let json = await res.json();
      if (json.result == 200) {
        setIsAuthenticated(true);
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
          <p> Please log in to proceed </p>
        )}
      </div>
    </div>
  );
}
export default LoginPage;
