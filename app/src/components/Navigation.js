import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function Navigation({ auth }) {
  return (
    <Navbar bg="white" style={{ marginBottom: "50px" }}>
      <Container>
        <Navbar.Brand href="#/">Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll navbarSupportedContent">
          {auth &&
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            <Nav.Link href="#/logout">Logout</Nav.Link>
            <Nav.Link href="#/profile">Profile</Nav.Link>
            <Nav.Link href="#/quote">Quote</Nav.Link>
            <Nav.Link href="#/history">History</Nav.Link>
          </Nav>
          }
          {!auth &&
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            <Nav.Link href="#/login">Login</Nav.Link>
          </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
