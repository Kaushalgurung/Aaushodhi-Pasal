import React, { useContext, useEffect, useState } from "react";
import { Link} from 'react-router-dom';
import {
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../user/context";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Logout = ({ show, handleClose }) => {
  const { logout } = useContext(UserContext);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to logout? </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default function Navs({ authenticated }) {
  const { refreshData, is_admin } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    refreshData();
  }, []);
  return (
    <>
              <div className="topbar">
            <div className="container">
              <div className="row">
                <div className="col-sm-8 text-sm">
                  <div className="site-info">
                    <a href="#"><span className="mai-call text-primary" /> +00 123 4455 6666</a>
                    <span className="divider">|</span>
                    <a href="mailto: marketingsginerix@gmail.com"><span className="mai-mail text-primary" /> mail@example.com</a>
                  </div>
                </div>
                <div className="col-sm-4 text-right text-sm">
                  <div className="social-mini-button">
                    <a href="#"><span className="mai-logo-facebook-f" /></a>
                    <a href="#"><span className="mai-logo-twitter" /></a>
                    <a href="#"><span className="mai-logo-instagram" /></a>
                  </div>
                </div>
              </div> {/* .row */}
            </div> {/* .container */}
          </div>
      <Navbar collapseOnSelect expand="lg" className="nav-color" variant="dark">
        <Container display="flex">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Link to = "/"><a className="navbar-brand" ><span className="text-primary">औशधि</span>-पसल</a></Link>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/doctors">Pharmacy</Nav.Link>
               <Nav.Link href="/products">Products</Nav.Link>
               <Nav.Link href ="/medicines">Medicines</Nav.Link> 
              {/* <Nav.Link href="/about">About-us</Nav.Link> */}

              {/* Pachi halam la time bhayoo bhane */}


              {/* <Nav.Link href="/cart"> */}
              {/* <Badge badgeContent={1} color="secondary">
                <ShoppingCartIcon color="inherit"/>
              </Badge> */}
              {/* Cart */}
            {/* </Nav.Link> */}
            
              {/* <Nav.Link href="/signup">Register</Nav.Link> */}

              {/* Yeta samma baki cha garna */}
              {authenticated ? (
                <>
                  <Nav.Link href="/doctors/add">Add Pharmacy</Nav.Link>
                  <Nav.Link href="/products/add">Add Product</Nav.Link>
                  <Nav.Link href="/medicines/add">Add Medicine</Nav.Link>
                  <Nav.Link href="/appointments">Medicine Orders</Nav.Link>
                  <Nav.Link href="/orders">Product Orders</Nav.Link>
                </>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {is_admin ? (
            <Navbar.Collapse className="justify-content-end">
              Signed in as :
              <Navbar.Text>
                <NavDropdown title="Admin" menuVariant="dark">
                  <NavDropdown.Item
                    onClick={() => {
                      history.push("/admin/changepassword");
                    }}
                  >
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleShow}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Text>
            </Navbar.Collapse>
          ) : (
            ""
          )}
        </Container>
      </Navbar>
      <Logout show={show} handleClose={handleClose} />
    </>
  );
}
