import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: #000;
  margin-right: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function NavBar() {
  const { userPermission: userType } = useContext(AuthContext);
  if (userType == "admin") {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Dan's Auto Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/vehicles">View Our Vehicles </StyledLink>
              <StyledLink to="/reservations">Make a Reservation</StyledLink>
              <StyledLink to="/admin/payemployees">Pay Employees</StyledLink>
              <StyledLink to="/admin/">Admin</StyledLink>
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
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/vehicles">View Our Vehicles </StyledLink>
              <StyledLink to="/reservations">Make a Reservation</StyledLink>
              <StyledLink to="/employee/loghours">Log Hours</StyledLink>
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
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/vehicles">View Our Vehicles </StyledLink>
              <StyledLink to="/reservations">Make a Reservation</StyledLink>
              <StyledLink to="/account/dashboard">Account</StyledLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
