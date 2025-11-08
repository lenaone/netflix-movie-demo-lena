import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
    <div className='navbar'>
      <Navbar expand="lg" style={{ backgroundColor: 'black', width: '100%' }}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img className='netflix-logo' src="/netflixLogo.svg" alt="Netflix" />
          </Navbar.Brand>
          <Button
            aria-controls="basic-navbar-nav"
            type="button"
            aria-label="Toggle navigation"
            className="navbar-toggler collapsed"
            onClick={() => setToggle(!toggle)}
            style={{ border: '2px solid #888', borderRadius: '12px', background: 'transparent', marginLeft: 'auto' }}
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          <Navbar.Collapse
            id="navbarScroll"
            style={{ justifyContent: 'space-between', display: toggle ? 'flex' : '', flexDirection: toggle ? 'column' : '', background: toggle ? 'black' : '', position: toggle ? 'absolute' : '', top: toggle ? '60px' : '', left: 0, width: '100%', zIndex: 10 }}
          >
            <Nav
              className="my-2 my-lg-0"
              navbarScroll
              style={{ flexDirection: toggle ? 'column' : 'row', alignItems: toggle ? 'flex-start' : 'center' }}
            >
              <Nav.Link href="/" style={{ color: "white", marginBottom: toggle ? '10px' : '0' }} >Home</Nav.Link>
              <Nav.Link href="/movies" style={{ color: "white", marginBottom: toggle ? '10px' : '0' }}>Movies</Nav.Link>
            </Nav>
            <Form className="d-flex" style={{ marginBottom: toggle ? '10px' : '0' }}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search-input"
                aria-label="Search"
                style={{ backgroundColor: 'grey'}}
              />
              <Button variant="outline-danger" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
      <div>
   <Outlet />
      </div>
   
    </div>
  );
}

export default AppLayout