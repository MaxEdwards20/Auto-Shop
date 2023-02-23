import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to our website!</h1>
      <p>Sign up for an account:</p>
      <Link to="/account/create">Sign up</Link>
    </div>
  );
}
