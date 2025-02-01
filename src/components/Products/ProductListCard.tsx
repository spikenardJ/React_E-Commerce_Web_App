import { Product } from "../../types/types";
import { addProduct } from "../../store/cartSlice";
import { useProducts } from "../../hooks/useProducts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {  isLoading, deleteProduct, isDeleting } = useProducts();
  const dispatch = useDispatch(); // Use `useDispatch` inside the component
  const navigate = useNavigate();

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct({ ...product, quantity: 1 })); // Dispatch the action correctly
    alert("Item added to cart successfully! 🎉");
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        deleteProduct(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4" id="product-card">
      <div id="product-image-div">
        <img id="product-image" src={product.image} alt={product.title} />
      </div>
      <p>${product.price.toFixed(2)}</p>
      <h6>{product.title}</h6>
      <br />
      <p id="product-description"><small>{product.description}</small></p>
      <div id="cart-btn-div">
        <button id="cart-btn" onClick={() => handleAddProduct(product)}>
          Add to Cart
        </button>
        <br />
        <button id="edit-btn" onClick={() => navigate(`/products/edit/${product.id}`)}>
            Edit Product
        </button>
        <br />
        <button id="delete-btn" onClick={() => product.id && handleDeleteProduct(product.id)} disabled={isDeleting}>
            Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;