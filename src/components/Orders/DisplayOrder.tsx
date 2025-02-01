import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrder } from "../../hooks/useOrders";
import { Product } from "../../types/types";

const OrderItem: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div>
        <p>Title: {product.title}</p>
        <p>Price: {product.price}</p>
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
  
    return (
      <div>
        <h2>Display Order</h2>
        <p>Order ID: {order?.id}</p>
        <p>Total: {order?.total}</p>
        <p>Products:</p>
        {order?.products.map((product: Product) => (
          <OrderItem key={product.id} product={product} />
        ))}
        <p>
          Created At: {order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
        </p>
      </div>
    );
  };
  

export default DisplayOrder;