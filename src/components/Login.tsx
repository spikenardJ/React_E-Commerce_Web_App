import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const navigate = useNavigate();
  // useEffect (() => {
  //   if (user) {
  //   console.log(user)
  //     navigate("/profile");
  //   }
  // },[user]);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    // setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/profile");
    } catch (err: any) {
      const errorMessage =
        err.code === "auth/user-not-found"
          ? "User not found. Please check your email."
          : err.code === "auth/wrong-password"
          ? "Incorrect password. Please try again."
          : "An error occurred during login.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={handleLogin}
        className="p-4 shadow rounded bg-light mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
