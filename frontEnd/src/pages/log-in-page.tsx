import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logInStatus, setLogInStatus] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let url = `https://BACKEND_URL_HERE?username=${username}&pass=${password}`;
    async () => {
      let res = await fetch(url);
      let json = await res.json();
      if (json.result == 200) {
        setLogInStatus(true);
      }
    };
  };
  return (
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
  );
}
export default LoginPage;
