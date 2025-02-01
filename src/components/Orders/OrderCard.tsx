import { Order } from "../../types/types";
import { Product } from "../../types/types";
import { Link } from "react-router-dom";
import { useDeleteOrder } from "../../hooks/useOrders";
import { useAuth } from "../../context/auth";

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const { user } = useAuth();
  const { mutate: deleteOrder } = useDeleteOrder(user?.uid ?? ""); 

  console.log(order.products);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    // Proceed with custom logic, if needed
  };

  const handleDelete = () => {
    if (order.id) {  // Ensure that order.id is defined
      if (window.confirm("Are you sure you want to delete this order?")) {
        deleteOrder(order.id);  // Now it's safe to pass `order.id`
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
        <strong>Created At:</strong> {order.createdAt ? new Date((order.createdAt as any).seconds * 1000).toLocaleString() : "N/A"}
      </p>
      <p><strong>Items:</strong> {order.products?.length ?? 0}</p>
      <div id="order-btn-div">
      <Link to={`/orders/${order.id}`}>
        <button id="order-details-btn" onClick={handleClick}>View Details</button>
      </Link>
        <br />
        <button id="remove-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default OrderCard;

