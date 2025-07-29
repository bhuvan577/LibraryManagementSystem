import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    borrowed: 0,
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStats(res.data);
    };

    const fetchHistory = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/admin/borrow-history",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setHistory(res.data);
    };

    fetchStats();
    fetchHistory();
  }, [user.token]);

  return (
    <div className="space-y-8">
      {/* 📊 Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-sm text-gray-500">Total Books</h3>
          <p className="text-2xl font-bold">{stats.books}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-sm text-gray-500">Registered Users</h3>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-sm text-gray-500">Books Borrowed</h3>
          <p className="text-2xl font-bold">{stats.borrowed}</p>
        </div>
      </div>

      {/* 📄 Borrow History Table */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-bold mb-4">📄 Borrow History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Book</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Returned</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry._id} className="border-t">
                  <td className="p-3">{entry.user.name}</td>
                  <td className="p-3">{entry.book.title}</td>
                  <td className="p-3">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{entry.returned ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
