import React from "react";
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
      const credential = credentialResponse.credential;
      const response = await api.post("/api/auth/google", { credential });

      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      // Glassomorphic card for the login contents
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative"
      style={{ backgroundImage: "url('/images/login_bg.jpg')" }}
    >
      <div className="bg-white/50 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-lg shadow-lg w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-2 drop-shadow-sm break-words">
          Welcome to ThoughtStream
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 font-medium">
          Reflect, record, and remember.
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error("Google login failed")}
          />
        </div>
      </div>

      {/* Background image attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded backdrop-blur-sm max-w-xs sm:max-w-sm">
        Photo by{" "}
        <a
          href="https://unsplash.com/@ashwinward18?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          className="underline hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          André Cogez
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/photos/a-river-running-through-a-lush-green-forest-EWvJ1fc_8VU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          className="underline hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          Unsplash
        </a>
      </div>
    </div>
  );
}
export default Login;
