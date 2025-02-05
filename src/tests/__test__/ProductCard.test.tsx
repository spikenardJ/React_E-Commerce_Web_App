import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../../components/Products/ProductCard";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const mockProduct = {
    id: "1",
    title: "Test Product",
    price: 29.99,
    quantity: 2,
    description: "A great product",
    image: "test.jpg",
    category: "Electronics",
    createdAt: new Date,
    updatedAt: new Date,
};

describe("ProductCard Component", () => {
  it("renders product details correctly", () => {
    render(
        <Provider store={store}>
          <ProductCard product={mockProduct} />
        </Provider>
      );

    // Check if the product title, price, and description are rendered
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("A great product")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument(); 
  });
});