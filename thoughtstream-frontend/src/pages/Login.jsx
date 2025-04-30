import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      const response = await api.post("/api/auth/google", { credential });

      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 login-background">
      <div className="bg-white/40 backdrop-blur rounded p-6 w-full max-w-xl text-center shadow-lg">
        <h1 className="login-heading mb-2">Welcome to ThoughtStream</h1>
        <p className="login-subtext mb-6">Reflect, record, and remember.</p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error("Google login failed")}
            shape="pill"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
