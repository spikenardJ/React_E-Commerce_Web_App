import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Product } from "../types/types";

const COLLECTION_NAME = "products";
const productsRef = collection(db, COLLECTION_NAME);

export const fetchProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
};

export const fetchCategories = async (): Promise<string[]> => {
    const products = await fetchProducts();
    const categories = [...new Set(products.map((product) => product.category))];
    return categories;
};

export const fetchCategoriesProducts = async (category: string): Promise<Product[]> => {
    const q = query(productsRef, where("category", "==", category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
};
