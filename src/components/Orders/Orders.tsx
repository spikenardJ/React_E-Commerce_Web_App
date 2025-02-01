import React from "react";
import { useAuth } from "../../context/auth";
import { useOrders } from "../../hooks/useOrders";
import { Order } from "../../types/types";
import OrderCard from "./OrderCard";
import NavBar from "../NavBar";

const Orders: React.FC = () => {
    const { user, loading } = useAuth();
    const { data: orders } = useOrders(user?.uid ?? ""); // Fetch user orders

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Please log in to view orders.</div>;

    return (
        <div>
            <NavBar />
            <h1>Your Orders</h1>
            {orders?.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <div className="container">
                    <div className="row">
                        {orders?.map((order) => (
                            <div className="col-lg-4 col-md-4 col-sm-12 mb-4" key={order.id}>
                                <OrderCard order={order} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
