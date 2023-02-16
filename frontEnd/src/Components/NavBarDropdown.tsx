import context from "react-bootstrap/esm/AccordionContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function NavBarDropdown(props: any) {
  const { isAuthenticated, userType, login } = useContext(AuthContext);
  login("admin"); // for testing the different views
  if (!isAuthenticated) {
    return (
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="/account/login">Log In</NavDropdown.Item>
      </NavDropdown>
    );
  }
  // we know they are authenticated here
  if (userType == "admin") {
    return (
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="/account">Account Info</NavDropdown.Item>
        <NavDropdown.Item href="/reservation">My Reservations</NavDropdown.Item>
        <NavDropdown.Item href="/account/vehicles">
          Reserved Vehicles
        </NavDropdown.Item>
        <NavDropdown.Item href="/payemployees">Pay Employees</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/account/login">Log Out</NavDropdown.Item>
      </NavDropdown>
    );
  } else if (userType == "employee") {
    return (
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item href="/account">Account Info</NavDropdown.Item>
        <NavDropdown.Item href="/reservation">My Reservations</NavDropdown.Item>
        <NavDropdown.Item href="/account/vehicles">
          Reserved Vehicles
        </NavDropdown.Item>
        <NavDropdown.Item href="/loghours">Log Hours</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/account/login">Log Out</NavDropdown.Item>
      </NavDropdown>
    );
  }
  return (
    <NavDropdown title="Account" id="basic-nav-dropdown">
      <NavDropdown.Item href="/account">Account Info</NavDropdown.Item>
      <NavDropdown.Item href="/reservation">My Reservations</NavDropdown.Item>
      <NavDropdown.Item href="/account/vehicles">
        Reserved Vehicles
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/account/login">Log Out</NavDropdown.Item>
    </NavDropdown>
  );
}
