import { Order } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useDeleteOrder } from "../../hooks/useOrders";
import { useAuth } from "../../context/auth";

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const { user } = useAuth();
  const { mutate: deleteOrder } = useDeleteOrder(user?.uid ?? "");
  const navigate = useNavigate();  // useNavigate hook

  const handleDelete = () => {
    if (order.id) {  
      if (window.confirm("Are you sure you want to delete this order?")) {
        deleteOrder(order.id);  // Delete order
        alert("Order deleted successfully.");
        navigate(`/orders`);  // Navigate to orders list after deleting the order
      }
    } else {
      console.error("Order ID is missing");
    }
  };

  return (
    <div className="mt-4" id="order-card">
      <h6>Order ID: {order.id}</h6>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <p>
      <strong>Created At:</strong>{" "}
      {order.createdAt
        ? (order.createdAt as any).seconds
            ? new Date((order.createdAt as any).seconds * 1000).toLocaleString() // Firestore Timestamp
            : new Date(order.createdAt).toLocaleString() 
        : "N/A"}
      </p>
      <p><strong>Items:</strong> {order.products?.length ?? 0}</p>
      <div id="order-btn-div">
        <button id="order-details-btn" onClick={() => navigate(`/orders/${order.id}`)}>View Details</button> 
        <br />
        <button id="remove-btn" onClick={handleDelete}>Delete</button> 
      </div>
    </div>
  );
};

export default OrderCard;
