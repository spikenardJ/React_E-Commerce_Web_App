import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { Product, CreateProductInput, UpdateProductInput,} from "../types/types";

const COLLECTION_NAME = "products";
const productsRef = collection(db, COLLECTION_NAME);

export const getProducts = async (): Promise<Product[]> => {
    try {
        const snapshot = await getDocs(productsRef);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title ?? "",
                description: data.description ?? "",
                price: data.price ?? 0,
                category: data.category ?? "",
                createdAt: data.createdAt ? data.createdAt.toDate() : null,
                updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
                image: data.image ?? "",
            };
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const createProduct = async (
    product: CreateProductInput
): Promise<Product> => {
    const docRef = await addDoc(productsRef, {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return {
        id: docRef.id,
        ...product,
        createdAt: new Date(), 
        updatedAt: new Date(), 
    };
};

export const updateProduct = async (
    id: string,
    product: UpdateProductInput
): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
        ...product,
        updatedAt: serverTimestamp(),
    });
};

export const deleteProduct = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
};