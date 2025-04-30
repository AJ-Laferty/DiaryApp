import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">ThoughtStream</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Hi, {user?.name || "User"}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
