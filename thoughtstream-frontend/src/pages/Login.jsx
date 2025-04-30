import { GoogleLogin } from "@react-oauth/google";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const response = await api.post("/api/auth/google", { idToken });

      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to ThoughtStream</h1>
      <p className="text-gray-600 mb-6">Record your thoughts, reflections, and moments.</p>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error("Google login failed")}
      />
    </div>
  );
}

export default Login;
