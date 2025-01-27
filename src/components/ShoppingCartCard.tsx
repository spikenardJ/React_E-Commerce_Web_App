import { Product } from "../types/types";
import { removeProduct } from "../store/cartSlice";
import { useDispatch } from "react-redux";

const ShoppingCartCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="mt-4" id="product-card">
      <div id="product-image-div">
        <img id="product-image" src={product.image} alt={product.title} width="150" />
      </div>
      <p>${typeof product.price === "number" && !isNaN(product.price) ? product.price.toFixed(2) : "N/A"}</p>
      <h6>{product.title}</h6>
      <p>Quantity: {product.quantity}</p>
      <div id="cart-btn-div">
        <button id="remove-btn" onClick={() => handleRemove(product.id)}>Remove</button>
      </div>
    </div>
  );
};

export default ShoppingCartCard;