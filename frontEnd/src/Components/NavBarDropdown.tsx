import context from "react-bootstrap/esm/AccordionContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function NavBarDropdown(props: any) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return (
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="/account/login">Log In</NavDropdown.Item>
        <NavDropdown.Item href="/account/create">
          Create Account
        </NavDropdown.Item>
      </NavDropdown>
    );
  } else {
    return (
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="/account">Account Info</NavDropdown.Item>
        <NavDropdown.Item href="/reservation">My Reservations</NavDropdown.Item>
        <NavDropdown.Item href="/account/balance">
          Deposit Funds
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/account/login">Log Out</NavDropdown.Item>
      </NavDropdown>
    );
  }
}
