import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../config/products";
import { UpdateProductInput } from "../types/types";

export const useProducts = () => {
    const queryClient = useQueryClient();

    const { data: products, isLoading, error } = useQuery("products", getProducts);
    console.log("products: ", products);
    if (error) {
        console.error("Firestore Error: ", error)
    }

    const createMutation = useMutation(createProduct, {
        onSuccess: () => queryClient.invalidateQueries("products"),
        onError: (error) => console.error("Create Product Error:", error)
    });
    
    const updateMutation = useMutation(({ id, product }: { id: string, product: UpdateProductInput }) => updateProduct(id, product), {
        onSuccess: () => queryClient.invalidateQueries("products"),
        onError: (error) => console.error("Update Product Error:", error)
    });
    
    const deleteMutation = useMutation(deleteProduct, {
        onSuccess: () => queryClient.invalidateQueries("products"),
        onError: (error) => console.error("Delete Product Error:", error)
    });

    return {
        products,
        isLoading,
        createProduct: createMutation.mutateAsync,
        updateProduct: updateMutation.mutateAsync,
        deleteProduct: deleteMutation.mutateAsync,
        isCreating: createMutation.isLoading,
        isDeleting: deleteMutation.isLoading
    };
};