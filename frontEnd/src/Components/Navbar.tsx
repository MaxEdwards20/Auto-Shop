import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import NavBarDropdown from "./NavBarDropdown";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function NavBar() {
  const { userType } = useContext(AuthContext);
  // Use these to test the application
  // const { login } = useContext(AuthContext);
  // login("admin");
  if (userType == "admin") {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Dan's Auto Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/vehicles">View Our Vehicles </Nav.Link>
              <Nav.Link href="/reservation">Make a Reservation</Nav.Link>
              <Nav.Link href="/admin/payemployees">Pay Employees</Nav.Link>
              <Nav.Link href="/admin/">Admin</Nav.Link>
              <NavBarDropdown />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else if (userType == "employee") {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Dan's Auto Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/vehicles">View Our Vehicles </Nav.Link>
              <Nav.Link href="/reservation">Make a Reservation</Nav.Link>
              <Nav.Link href="/employee/loghours">Log Hours</Nav.Link>
              <NavBarDropdown />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Dan's Auto Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/vehicles">View Our Vehicles </Nav.Link>
              <Nav.Link href="/reservation">Make a Reservation</Nav.Link>
              <NavBarDropdown />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
