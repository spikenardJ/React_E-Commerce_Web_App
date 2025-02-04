import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

interface RegisterFormProps {
  submitFunction?: (data: any) => void;
  prefillData?: {
    userId: string;
    email: string;
    password: string;
    displayName: string;
    isLoggedIn: boolean;
  };
}

// submitFunction
// const RegisterUser: React.FC<RegisterFormProps> = ({ submitFunction, prefillData}) => {
const RegisterUser: React.FC<RegisterFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  // const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // setError(null);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
        

      alert("Registration successful!");
      setEmail("");
      setDisplayName("");
      setPassword("");

    } catch (err: any) {
      const errorMessage = err.message || "An error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center">Register</h3>
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded bg-light mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && error}<p>{error}</p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary w-100"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default RegisterUser;