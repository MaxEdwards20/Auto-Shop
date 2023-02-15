import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBarDropdown(props: any) {
  const isAuthenticated = props.isAuthenticated;
  return (
    <div>
      {isAuthenticated ? (
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="/account">Account Info</NavDropdown.Item>
          <NavDropdown.Item href="/reservation">
            My Reservations
          </NavDropdown.Item>
          <NavDropdown.Item href="/account/vehicles">
            Reserved Vehicles
          </NavDropdown.Item>
          {props.isManager ? (
            <NavDropdown.Item href="/account/pay">
              Pay Employees
            </NavDropdown.Item>
          ) : (
            <NavDropdown.Item href="/account/hours">Log Hours</NavDropdown.Item>
          )}
          <NavDropdown.Divider />
          <NavDropdown.Item href="/account/login">Log Out</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item href="/account/login">Log In</NavDropdown.Item>
        </NavDropdown>
      )}
    </div>
  );
}
