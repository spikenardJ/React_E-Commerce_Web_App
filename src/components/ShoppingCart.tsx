import { RootState } from "../store/store";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCreateOrder } from "../hooks/useOrders";
import ShoppingCartCard from "./ShoppingCartCard";
import confetti from "canvas-confetti";

const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { mutate: createOrder } = useCreateOrder(user?.uid ?? "");

    const cart = useSelector((state: RootState) => state.cart.products);
    const totalAmount = cart.reduce((acc, product) => acc + (product.quantity ?? 0), 0);
    const totalPrice = cart.reduce((acc, product) => acc + product.price * (product.quantity ?? 0), 0);

    const handleCheckout = () => {
        if (!user) {
            alert("Please log in to place an order.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const order = {
            userId: user.uid,
            total: totalPrice,
            products: cart,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        console.log("🛒 Creating order:", order);
        createOrder(order, {
            onSuccess: () => {
                console.log("Order successfully created!");
                dispatch(clearCart());
                confetti({ particleCount: 200, spread: 180 });
                navigate("/orders");
            },
            onError: (error) => {
                console.error("Order creation failed:", error);
                alert("Order creation failed. Please try again.");
            }
        });
    };

    return (
        <Container className="d-flex justify-content-center flex-column">
            <Row>
                <Col>
                    <h1>Shopping Cart</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                <button id="check-out-btn" onClick={handleCheckout}><strong>Checkout</strong></button>
                            </div>
                            <Row>
                                {cart.map((product) => (
                                    <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                                        <ShoppingCartCard product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <p>Total Products: {totalAmount}</p>
                            <p>Total Price: ${totalPrice.toFixed(2)}</p>
                            <div style={{ textAlign: "center", marginBottom: "70px" }}>
                                <button id="clear-cart-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ShoppingCart;
