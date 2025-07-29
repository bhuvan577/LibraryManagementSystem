import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminPanel = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    copies: 1,
  });
  const [editBookId, setEditBookId] = useState(null);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (editBookId) {
      await axios.put(
        `http://localhost:5000/api/books/${editBookId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    } else {
      await axios.post("http://localhost:5000/api/books", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
    setFormData({ title: "", author: "", copies: 1 });
    setEditBookId(null);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      copies: book.copies,
    });
    setEditBookId(book._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchBooks();
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">📚 Admin Book Management</h2>

      {/* 📋 Form */}
      <form
        onSubmit={handleAddOrUpdate}
        className="mb-6 bg-white p-4 rounded shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Book Title"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            placeholder="Author"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="copies"
            value={formData.copies}
            min="1"
            placeholder="Copies"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editBookId ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* 📦 Book Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Copies</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.copies}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
