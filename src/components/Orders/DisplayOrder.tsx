import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrder, useDeleteOrder } from "../../hooks/useOrders";
import { Product } from "../../types/types";
import { useAuth } from "../../context/auth";

const OrderItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        margin: "30px",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <br />
      <img style={{ width: "90px", border: "1px solid black", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}} src={product.image} alt={product.title} />
      <br /><br />
      <p><strong>Title:</strong> {product.title}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
    </div>
  );
};

const DisplayOrder: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: order } = useGetOrder(orderId!);
  const { mutate: deleteOrder } = useDeleteOrder(user?.uid ?? ""); 

  if (!orderId) {
    return <p>Order not found.</p>;
  }

  if (!order) {
    return <p>Loading...</p>;
  }

  const handleDelete = () => {
    if (order.id) {
      if (window.confirm("Are you sure you want to delete this order?")) {
        deleteOrder(order.id);
        alert("Order deleted successfully.");
        navigate("/orders");
      }
    } else {
      console.error("Order ID is missing");
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            textAlign: "left",
            border: "2px solid black",
            borderRadius: "10px",
            boxShadow: "0 0 4px black",
            padding: "30px 40px",
            backgroundColor: "azure",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: "teal",
              color: "white",
            }}
            className="card-header text-center mx-3"
          >
            <h4 className="mb-0">Order Details</h4>
          </div>

          <div style={{ textAlign: "center" }}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p>
            <strong>Created At:</strong>{" "}
            {order.createdAt
                ? (order.createdAt as any).seconds
                    ? new Date((order.createdAt as any).seconds * 1000).toLocaleString() // Firestore Timestamp
                    : new Date(order.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <h5>Products:</h5>
          <div style={{ textAlign: "center" }}>
            {order.products.map((product: Product) => (
              <OrderItem key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mx-3" style={{ marginTop: "20px" }}>
            <button
              className="btn"
              style={{ backgroundColor: "crimson", color: "white", marginRight: "10px" }}
              onClick={handleDelete} 
            >
              Delete Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayOrder;
