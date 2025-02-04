import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterUser from "../../components/User/RegisterUser";
import { createUserWithEmailAndPassword, updateProfile } from "../../config/__mocks__/firebaseAuth";
import React from "react";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

const handleRegisterSubmit = (formData: any) => {
  console.log("Form submitted:", formData);
};

describe("RegisterUser Component", () => {
  it("renders correctly", () => {
    render(<RegisterUser submitFunction={handleRegisterSubmit} />);
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it("shows error when required fields are missing", async () => {
    render(<RegisterUser submitFunction={handleRegisterSubmit} />);

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    expect(screen.getByText(/Email and password are required/i)).toBeInTheDocument();
  });

  it("shows error for weak password", async () => {
    render(<RegisterUser submitFunction={handleRegisterSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "123" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  it("registers user successfully", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "12345" },
    });
    (updateProfile as jest.Mock).mockResolvedValue(null);

    render(<RegisterUser submitFunction={handleRegisterSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: "John Doe" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalled());
    await waitFor(() => expect(updateProfile).toHaveBeenCalled());
    expect(screen.queryByText(/Registration successful!/i)).toBeInTheDocument();
  });

  it("handles Firebase errors", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error("Email already in use"));

    render(<RegisterUser submitFunction={handleRegisterSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "existing@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: "Jane Doe" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => expect(screen.getByText(/Email already in use/i)).toBeInTheDocument());
  });
});


// import { render, screen } from "@testing-library/react"; 
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
// import RegisterUser from "../../components/User/RegisterUser";

// const queryClient = new QueryClient();

// describe("RegisterUser Unit Test", () => {
  
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it("displays the user info in a form", async () => {
    
//     const mockUser = {
//         userId: "1",
//         email: "johnd@example.com",
//         password: "example",
//         displayName: "John D.",
//         isLoggedIn: true,
//       };



//     render(
//       <QueryClientProvider client={queryClient}>
//         <RegisterUser
//             submitFunction={jest.fn()}
//             prefillData={mockUser}
//         />
//       </QueryClientProvider>
//     );

//     const email = screen.getByLabelText(/email/i) as HTMLInputElement;

//     expect(email.value).toBe("johnd@example.com");
//   });
// });