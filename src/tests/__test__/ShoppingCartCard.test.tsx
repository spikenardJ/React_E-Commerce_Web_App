
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ProfileForm from "../../components/User/ProfileForm";
import ShoppingCartCard from "../../components/ShoppingCartCard";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { removeProduct } from "../../store/cartSlice";
import { Product } from "../../types/types";
import { useDispatch } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../store/cartSlice", () => ({
  removeProduct: jest.fn((id) => ({ type: "cart/removeProduct", payload: id })), 
}));

describe("ProfileForm Component", () => {
  it("renders correctly", () => {
    render(<MemoryRouter><ProfileForm /></MemoryRouter>);
    expect(screen.getByText(/Create Profile/i)).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(<MemoryRouter><ProfileForm /></MemoryRouter>);
    
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    expect(nameInput).toHaveValue("John Doe");
  });

  it("submits form successfully", () => {
    render(<MemoryRouter><ProfileForm /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Jon Smith" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "jon@smith.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "111-111-1111" } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: "26" } });
  
    
    const submitButton = screen.getByText(/Save/i);

    
    fireEvent.click(submitButton);

    expect(screen.getByText(/Saving.../i)).toBeInTheDocument();
  });
});

describe("ShoppingCartCard Component", () => {
    const mockProduct: Product = {
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

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <ShoppingCartCard product={mockProduct} />
      </Provider>
    );
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });

  it("dispatches remove action on button click", () => {
    render(
      <Provider store={store}>
        <ShoppingCartCard product={mockProduct} />
      </Provider>
    );
  
    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);
  
    expect(mockDispatch).toHaveBeenCalledWith({ type: "cart/removeProduct", payload: "1" }); // ✅ Check actual dispatched action
  });
});
