import { Product } from "../types/types";
import { addProduct } from "../store/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch(); // Use `useDispatch` inside the component

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct({ ...product, quantity: 1 })); // Dispatch the action correctly
    alert("Item added to cart successfully! 🎉");
  };

  return (
    <div className="mt-4" id="product-card">
      <div id="product-image-div">
        <img id="product-image" src={product.image} alt={product.title} />
      </div>
      <p>${product.price.toFixed(2)}</p>
      <h6>{product.title}</h6>
      <div id="cart-btn-div">
        <button id="cart-btn" onClick={() => handleAddProduct(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;