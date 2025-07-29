import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Books from "./Books";
import AdminPanel from "./AdminPanel";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white p-4 shadow">
        <h1 className="text-xl font-semibold">Library Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Hi, {user?.name} ({user?.role})
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-4">
        {user.role === "admin" ? <AdminPanel /> : <Books />}
      </div>
    </div>
  );
};

export default Dashboard;
