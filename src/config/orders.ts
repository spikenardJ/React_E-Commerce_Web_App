import { collection, deleteDoc, doc, getDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Order } from "../types/types";
  
const COLLECTION_NAME = "orders";
  
const ordersRef = collection(db, COLLECTION_NAME);
  
export const createOrder = async (order: Order) => {
    try {
        console.log("Attempting to create order:", order); // 🔍 Debugging Log

        const docRef = await addDoc(collection(db, "orders"), order);

        console.log("Order created with ID:", docRef.id); // ✅ Success Log
        return docRef.id;
    } catch (error) {
        console.error("Error creating order:", error); // ❌ Error Log
        throw error;
    }
};

  
// export const getOrders = async (userId: string) => {
//     const snapshot = await getDocs(
//       query(ordersRef, where("userId", "==", userId))
//     );
//     return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
// };

export const getOrders = async (userId: string) => {
    const snapshot = await getDocs(query(ordersRef, where("userId", "==", userId)));

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
        };
    }) as Order[];
};
  
export const deleteOrder = async (orderId: string) => {
    await deleteDoc(doc(db, "orders", orderId));
};
  
// export const getOrder = async (orderId: string) => {
//     const docRef = doc(ordersRef, orderId);
//     const docSnap = await getDoc(docRef);
//     return { id: docSnap.id, ...docSnap.data() } as Order;
// };

export const getOrder = async (orderId: string) => {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error("Order not found");
    }

    const data = docSnap.data();

    return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
        products: data.products.map((product: any) => ({
            ...product,
            quantity: product.quantity ?? 1, // Ensure quantity is set
        })),
    } as Order;
};