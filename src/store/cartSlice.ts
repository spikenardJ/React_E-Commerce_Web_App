import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface CartState {
    products: Product[];
  }
  
  const initialState: CartState = {
    products: JSON.parse(sessionStorage.getItem("cart") || "[]"),
  };
  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addProduct: (state, action: PayloadAction<Product>) => {
        const existingProduct = state.products.find(
          (product) => product.id === action.payload.id
        );
        if (existingProduct) {
          if (existingProduct && existingProduct.quantity !== undefined) {
            if (action.payload.quantity !== undefined) {
              existingProduct.quantity += action.payload.quantity;
            }
          }
        } else {
          state.products.push(action.payload);
        }
        sessionStorage.setItem("cart", JSON.stringify(state.products));
      },

      removeProduct: (state, action: PayloadAction<string>) => {
        console.log("Dispatched removeProduct with ID:", action.payload);  // Debugging log
      
        state.products = state.products.filter((product) => String(product.id) !== action.payload);
      
        console.log("Updated products array:", state.products); // Check if state is updating
      
        sessionStorage.setItem("cart", JSON.stringify(state.products));
      },

      clearCart: (state) => {
        state.products = [];
        sessionStorage.removeItem("cart");
      },
    },
  });
  
  export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;
