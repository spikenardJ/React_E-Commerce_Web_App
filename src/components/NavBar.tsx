import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
// import { useAuth0 } from "@auth0/auth0-react";

const NavBar: React.FC = () => {
//     const { isAuthenticated } = useAuth0();
  // Select the cart state
  const cart = useSelector((state: RootState) => state.cart.products);
  // Calculate the total count of items in the cart
  const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);


return (
  <Navbar  collapseOnSelect bg="light" expand="lg">
    <Container>
    <h2><Navbar.Brand style={{marginLeft: "10px", color: "teal"}} href="/">💲 E-Commerce App 💲</Navbar.Brand></h2>
    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        
    {/* {isAuthenticated && ( */}
      <>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-bar m-4 navbar-expand-lg navbar-light bg-light">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              id="nav-link"
            >
              <strong>Home Page</strong>
            </NavLink>
            <NavLink
              to="/shopping-cart"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              id="nav-link"
            >
              <strong>View Cart</strong>
            </NavLink>
            <NavLink className="cart-icon" style={{marginLeft: "50px", color: "grey"}} to="/shopping-cart">
              Cart {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </>
    {/* )} */}
    </Container>
  </Navbar>
);
};

export default NavBar;