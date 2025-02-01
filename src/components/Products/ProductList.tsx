import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/types";
import ProductListCard from "./ProductListCard";
import NavBar from "../NavBar";

const ProductList: React.FC = () => {
    const { products, isLoading } = useProducts();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <h1>Products List</h1>
            <div className="text-center mt-5 mb-3">
                <button id="new-product-btn" onClick={() => navigate("/products/new")}>Add New Product</button>
            </div>

            <div className="row">
                {products?.map((product: Product) => (
                    <div key={product.id} className="col-lg-4 col-md-4 col-sm-12 mb-4">
                        <ProductListCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
