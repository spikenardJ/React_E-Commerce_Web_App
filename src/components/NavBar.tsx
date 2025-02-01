import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onAuthStateChanged, User, getAuth, signOut } from "firebase/auth";
import { getUser } from "./User/userService";

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.cart.products);
  const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userData = await getUser(currentUser.uid);
        console.log("Fetched user data:", userData); // Debugging log
        setHasProfile(!!userData); // Convert to boolean
        console.log(!!userData)
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/"); // Redirect to homepage after logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Handle Profile Navigation
  const handleProfileClick = () => {
    if (hasProfile) {
      navigate("/profile"); // Go to profile page if profile exists
    } else {
      navigate("/profile-form"); // Redirect to profile form if no profile
    }
  };

  return (
    <Navbar collapseOnSelect bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "teal" }} href="/">
          <small>
          💲 E-Commerce App 💲
          </small>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-bar m-4 navbar-expand-lg navbar-light bg-light">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              <strong>Home Page</strong>
            </NavLink>
            <NavLink to="/shopping-cart" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              <strong>View Cart</strong>
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              <strong>Orders</strong>
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              <strong>Products</strong>
            </NavLink>

            {user && (
              <Button id="profile-btn" variant="light" style={{ paddingBottom: "8px" }} onClick={handleProfileClick}>
              <strong>Profile</strong>
              </Button>
              )}

            {user ? (
                <Button variant="light" style={{ color: "teal" }} onClick={handleLogout}>
                  Logout
                </Button>
            ) : (
              <NavLink style={{ marginLeft: "10px" }} to="/login">
                <Button variant="light" style={{ color: "teal" }} >Login</Button>
              </NavLink>
            )}

            <NavLink className="cart-icon" style={{ color: "grey" }} to="/shopping-cart">
              Cart {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
