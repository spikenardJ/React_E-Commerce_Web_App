import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterUser from "../../components/User/RegisterUser";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

// Mock Firebase Auth
jest.mock("firebase/auth", () => {
  return {
    createUserWithEmailAndPassword: jest.fn(),
  };
});

describe("RegisterUser Component", () => {
  test("should register a new user successfully", async () => {
    // Cast createUserWithEmailAndPassword as a Jest mock function
    const mockCreateUser = createUserWithEmailAndPassword as jest.Mock;

    // Mock the resolved value when createUserWithEmailAndPassword is called
    mockCreateUser.mockResolvedValueOnce({
      user: { uid: "123", email: "newuser@example.com" },
    });

    render(<RegisterUser />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "newuser@example.com" } });
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "securePassword123" } });

    // Submit the form
    fireEvent.submit(screen.getByRole("form"));

    // Wait for the error message to disappear
    await waitFor(() => {
      expect(screen.queryByText("An error occurred.")).toBeNull();
    });

    // Ensure Firebase function was called with correct parameters
    expect(mockCreateUser).toHaveBeenCalledWith(auth, "newuser@example.com", "securePassword123");
  });
});
