import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful! You can login now.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Signup</h2>
        <input
          name="name"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Signup
        </button>
        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
