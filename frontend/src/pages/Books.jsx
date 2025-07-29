import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setBooks(res.data);
  };

  const handleBorrow = async (bookId) => {
    await axios.post(
      `http://localhost:5000/api/borrow/${bookId}`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    fetchBooks();
  };

  const handleReturn = async (bookId) => {
    await axios.post(
      `http://localhost:5000/api/return/${bookId}`,
      {},
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Available Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-500">Copies: {book.copies}</p>
            <div className="mt-3">
              {book.borrowedBy?.includes(user._id) ? (
                <button
                  onClick={() => handleReturn(book._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Return
                </button>
              ) : (
                <button
                  onClick={() => handleBorrow(book._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Borrow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
