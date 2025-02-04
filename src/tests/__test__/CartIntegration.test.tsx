import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileForm from "../../components/User/ProfileForm";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("ProfileForm Component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create Profile/i)).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    );
    
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    expect(nameInput).toHaveValue("John Doe");
  });

  it("submits form successfully", async () => {
    render(
      <MemoryRouter>
        <ProfileForm />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByText(/Save/i);
    fireEvent.click(submitButton);
  
    await waitFor(() => screen.getByText(/Saving.../i));
  
    expect(screen.getByText(/Saving.../i)).toBeInTheDocument();
  });
});


// import { render, screen, fireEvent } from "@testing-library/react";
// import ShoppingCartCard from "../../components/ShoppingCartCard";
// import { Provider } from "react-redux";
// import { store } from "../../store/store";
// import { QueryClient, QueryClientProvider } from "react-query";
// import ProductCard from "../../components/Products/ProductCard";
// import React from "react";
// import { MemoryRouter } from "react-router-dom";

// const queryClient = new QueryClient();
// const product = {
//   image: "",
//   title: "title",
//   price: 1.99,
//   description: "example",
//   category: "jewelry",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// describe("ShoppingCart Integration", () => {
//   it("updates when a product is added", () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <Provider store={store}>
//           <MemoryRouter> {/* Ensures routing is available */}
//             <ProductCard product={product} />
//           </MemoryRouter>
//         </Provider>
//       </QueryClientProvider>
//     );

//     const addButton = screen.getByText(/Add to Cart/i);
//     fireEvent.click(addButton);

//     expect(screen.getByText(/Total Products: 1/i)).toBeInTheDocument();
//   });
// });
