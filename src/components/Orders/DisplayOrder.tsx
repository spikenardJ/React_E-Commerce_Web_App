import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrder } from "../../hooks/useOrders";
import { Product } from "../../types/types";
import NavBar from "../NavBar"; // Ensure the NavBar is imported

// Component to display individual product details in the order
const OrderItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px" }}>
      <h5>{product.title}</h5>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
};

const DisplayOrder: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  if (!orderId) {
    return <p>Order not found.</p>; // Handle case when `orderId` is undefined
  }

  const { data: order } = useGetOrder(orderId!);

  if (!order) {
    return <p>Loading...</p>; // Handle the loading state
  }

  return (
    <>
      <NavBar /> {/* Added Navigation Bar */}
      <div className="container mt-4">
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            boxShadow: "0 0 4px black",
            paddingTop: "30px",
            paddingBottom: "40px",
            backgroundColor: "azure",
          }}
        >
          <div style={{ marginBottom: "30px", borderRadius: "10px", padding: "10px", backgroundColor: "teal" }} className="card-header text-center text-white mx-3">
            <h4 className="mb-0">Order Details</h4>
          </div>

          <div className="mb-3" style={{ marginLeft: "15%" }}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Created At:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
          </div>

          <div style={{ marginLeft: "15%" }}>
            <h5>Products:</h5>
            {order.products.map((product: Product) => (
              <OrderItem key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mx-3">
            {/* Example of Edit/Delete buttons (add functionality as needed) */}
            <button className="btn btn-outline-dark" onClick={() => alert("Edit Order functionality goes here.")}>
              Edit Order
            </button>
            <br /><br />
            <button className="btn btn-danger" onClick={() => alert("Delete Order functionality goes here.")}>
              Delete Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayOrder;
