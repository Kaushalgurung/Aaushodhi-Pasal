import React, { useContext, useEffect, useState } from "react";
import { Link} from 'react-router-dom';
import './Nav.css'
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
import { useSelector } from "react-redux";

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
export default function Navs({ authenticated, signedIn, setSignedIn }) {
  const { refreshData, is_admin } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const quantity = useSelector(state => state.cart.quantity)
 
  const customerLogout = () => {
    localStorage.setItem("customer-token","")
   setSignedIn(false)
    history.push('/')
  }

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
          <Link className = "navLinks" to = "/"><a className="navbar-brand" ><span className="text-primary">औशधि</span>-पसल</a></Link>
            <Nav className="me-auto">
              <Link className = "navLinks" to="/">Home</Link>
              <Link className = "navLinks" to="/doctors">Pharmacy</Link>
               <Link className = "navLinks" to="/products">Products</Link>
               <Link className = "navLinks" to ="/medicines">Medicines</Link> 
              {/* <Nav.Link href="/about">About-us</Nav.Link> */}

              {/* Pachi halam la time bhayoo bhane */}


              {/* <Nav.Link href="/cart"> */}
              
              {/* Cart */}
            {/* </Nav.Link> */}
              {
                signedIn ? <Link className = "navLinks" to="/customer-signin" onClick = {customerLogout}>LogOut</Link> : 
                <Link className = "navLinks" to="/customer-signin">Login</Link>
              }
             
              {/* Yeta samma baki cha garna */}
              {authenticated ? (
                <>
                  <Link className = "navLinks" to="/doctors/add">Add Pharmacy</Link>
                  <Link className = "navLinks" to="/products/add">Add Product</Link>
                  <Link className = "navLinks" to="/medicines/add">Add Medicine</Link>
                  {/* <Link className = "navLinks" to="/appointments">Medicine Orders</Link>
                  <Link className = "navLinks" to="/orders">Product Orders</Link> */}
                </>
              ) : (
                <Link className = "navLinks" to="/login">AdminLogin</Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {is_admin ? (
            <Navbar.Collapse >
              Signed in as :
              <Navbar.Text>
                <NavDropdown title="Admin" menuVariant="dark">
                  <NavDropdown.Item
                    onClick={() => {
                      history.push("/admin/changepassword");
                    }}
                  >
                    Change Password(Admin)
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleShow}>
                    AdminLogout
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Text>
            </Navbar.Collapse>
          ) : (
            ""
          )}
           {
                signedIn && <Link to = '/cart' className = "navLinks" style = {{marginRight : "20px"}}><Badge badgeContent={quantity} color="secondary">
                <ShoppingCartIcon color="inherit"/>
              </Badge>
              </Link>
              }
              

        </Container>
      </Navbar>
      <Logout show={show} handleClose={handleClose} />
      
    </>
  );
}
