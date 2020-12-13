import React, { useContext } from 'react';
import { If, Else, Then } from 'react-if';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container, Button } from 'react-bootstrap';
import { RegisterContext } from '../../context/auth';
function MainNav() {
  const context = useContext(RegisterContext);
  return (
    <Navbar expand="md" className="navbar position-fixed">
      <Container>
        <Navbar.Brand as={Link} to="/">
          OneSchool
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">
              {context.loggedIn ? 'My Courses' : 'Home'}
            </Nav.Link>
            <Nav.Link as={Link} to="/public">
              Courses
            </Nav.Link>
            <If condition={context.loggedIn}>
              <Then>
                <Nav.Link as={Link} to="/" onClick={context.logout}>
                  Logout
                </Nav.Link>
              </Then>
              <Else>
                <Nav.Link as={Link} to="/register">
                  Login
                </Nav.Link>
              </Else>
            </If>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;