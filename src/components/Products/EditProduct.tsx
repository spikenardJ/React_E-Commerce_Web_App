import { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, updateProduct, isCreating, isDeleting, isLoading } = useProducts();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (isLoading) return;
        const product = products?.find((p) => p.id === id);
        if (product) {
            setEditingProduct(product);
        } else {
            setError("Product not found.");
        }
    }, [products, id, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct?.id) return;

        try {
            await updateProduct({
                id: editingProduct.id,
                product: editingProduct
            });
            navigate("/products");
        } catch (error) {
            console.error("Failed to update product: ", error);
            setError("Failed to update product.");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditingProduct(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                [name]: name === "price" ? Number(value) : value,
            };
        });
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!editingProduct || isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Product</h2>
            <ProductForm
                product={editingProduct}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                onCancel={() => navigate("/products")}
                isLoading={isLoading}
                isSubmitting={isCreating || isDeleting}
                submitButtonText="Save Changes"
                loadingButtonText="Saving..."
            />
        </div>
    );
};

export default EditProduct;