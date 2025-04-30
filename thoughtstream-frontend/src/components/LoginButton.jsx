import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api"; // Assuming you have an axios instance

const LoginButton = () => {
  const { login } = useContext(AuthContext); // Use context to manage user state
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse; // The Google ID token

      // Send the Google ID token to the backend for verification and JWT generation
      const res = await api.post("/api/auth/google", { credential });

      const { token, user } = res.data; // Extract JWT and user info from the response

      // Save JWT and user data in context/localStorage for session management
      login(token, user);

      // Redirect user to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Google login failed.");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.error("Google login failed");
        alert("Google login failed.");
      }}
    />
  );
};

export default LoginButton;
