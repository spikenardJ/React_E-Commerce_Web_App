import { useMutation, useQuery, useQueryClient } from "react-query";
import { createOrder, deleteOrder, getOrders, getOrder } from "../config/orders";
import { Order } from "../types/types";

export const useOrders = (userId: string) => {
    return useQuery(["orders", userId], () => getOrders(userId));
};

export const useCreateOrder = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation(async (order: Order) => {
        console.log("🛒 Creating order:", order);
        return await createOrder(order);
    }, {
        onSuccess: () => {
            console.log("Order successfully created!");
            queryClient.invalidateQueries(["orders", userId]); 
        },
        onError: (error) => {
            console.error("Order creation error:", error);
        }
    });
};

export const useGetOrder = (orderId: string) => {
    return useQuery(["order", orderId], () => getOrder(orderId));
};

export const useDeleteOrder = (userId: string) => {
    const queryClient = useQueryClient();
    return useMutation((orderId: string) => deleteOrder(orderId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["orders", userId]); // Ensure only this user's orders are refreshed
        }
    });
};
