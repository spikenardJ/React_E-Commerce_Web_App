import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addProduct } from "../../store/cartSlice";
import { Product } from "../../types/types";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import React from "react";
import { store } from "../../store/store"; // Import actual store if needed

const testProduct: Product = {
  id: "1",
  title: "Test Product",
  description: "This is a test product",
  price: 29.99,
  category: "Test Category",
  image: "test-image.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
  quantity: 1,
};

describe("Cart Integration Test", () => {
  it("should update cart state when a product is added", () => {
    const testStore = configureStore({ reducer: { cart: cartReducer } });

    // Dispatch addProduct action
    testStore.dispatch(addProduct(testProduct));

    // Get the updated state
    const state = testStore.getState();

    // Expect cart to have the product
    expect(state.cart.products).toHaveLength(1);
    expect(state.cart.products[0]).toEqual(testProduct);
  });
});
