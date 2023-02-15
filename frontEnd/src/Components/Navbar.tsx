import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavBarDropdown from "./NavBarDropdown";

function NavBar(props: any) {
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
            <NavBarDropdown props={props}></NavBarDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
