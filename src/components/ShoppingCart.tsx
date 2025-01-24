import { RootState } from "../store/store"
import { Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import NavBar from "./NavBar";
import ShoppingCartCard from "./ShoppingCartCard";
import confetti from "canvas-confetti";


const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.products);
  
    const totalAmount = cart.reduce((acc, product) => acc + (product.quantity ?? 0), 0);
    const totalPrice = cart.reduce((acc, product) => acc + product.price * (product.quantity ?? 0), 0);
  
    const handleCheckout = () => {
      dispatch(clearCart());
      alert('Checkout successful! Your cart has been cleared.');

      // Show confetti after a short delay
      setTimeout(() => {
        confetti({
          particleCount: 2000,
          spread: 180,
          origin: { x: 0.5, y: 0.5 }
        });
      }, 500); // 500ms delay

    };
  
    return (
        <>
            <Container className="d-flex justify-content-center flex-column">
                <Row>
                    <NavBar />
                </Row>
                <Row>
                    <Col>
                        <h1>Shopping Cart</h1>
                        <div id="cart-div">
                            <button id="check-out-btn" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id="cart-card">
                            {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                            ) : (
                            <div>
                            <Row>
                            {cart.map((product) => (
                                <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                                <ShoppingCartCard product={product} />
                                </Col>
                            ))}
                            </Row>
                                <Row>
                                    <Col>
                                        <div>
                                        <p>Total Products: {totalAmount}</p>
                                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div id="clear-cart-div">
                                            <button id="clear-cart-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            )}
                        </div>
                    </Col> 
                </Row>
            </Container>
        </>
    );
  };
  
  export default ShoppingCart;