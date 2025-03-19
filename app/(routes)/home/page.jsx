"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  Calendar,
  Building2,
  FileText,
  ExternalLink,
  Users2,
} from "lucide-react";

export default function page() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const fetchBooks = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&key=${API_KEY}`
      );
      console.log(response.data.items);

      setBooks(response.data.items);
    } catch (error) {
      console.error(
        "Error fetching objects:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const searchBtn = () => {
    fetchBooks();
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase(); // Convert query to lowercase for case-insensitive comparison
    setQuery(searchQuery);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Search Header */}
      <div className="bg-white shadow-lg px-4 py-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center">
            ספריית הספרים
          </h1>
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-right"
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="חפש ספרים..."
              dir="rtl"
            />
            <button
              onClick={searchBtn}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Search size={20} />
              <span>חפש</span>
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6 text-right">
          תוצאות החיפוש
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-center bg-amber-50 p-4">
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="h-48 object-contain"
                  />
                ) : (
                  <div className="w-32 h-48 bg-amber-100 flex items-center justify-center rounded">
                    <BookOpen className="text-amber-400" size={48} />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-amber-900 mb-2 text-right">
                  {book.volumeInfo.title}
                </h3>
                {book.volumeInfo.subtitle && (
                  <p className="text-amber-700 mb-3 text-right">
                    {book.volumeInfo.subtitle}
                  </p>
                )}

                <div className="space-y-2 text-right">
                  {book.volumeInfo.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {book.volumeInfo.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 mt-4">
                    {book.volumeInfo.publisher && (
                      <div className="flex items-center gap-1">
                        <Building2 size={16} />
                        <span>{book.volumeInfo.publisher}</span>
                      </div>
                    )}

                    {book.volumeInfo.publishedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{book.volumeInfo.publishedDate}</span>
                      </div>
                    )}
                   {book.volumeInfo.authors && (
                      <div className="flex items-center gap-1">
                        <Users2 size={16} />
                        <span>{book.volumeInfo.authors.join(', ')}</span>
                      </div>
                    )}

                    {book.volumeInfo.pageCount && (
                      <div className="flex items-center gap-1">
                        <FileText size={16} />
                        <span>{book.volumeInfo.pageCount} עמודים</span>
                      </div>
                    )}
                  </div>
                </div>

                {book.volumeInfo.infoLink && (
                  <a
                    href={book.volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-amber-600 hover:text-amber-700"
                  >
                    <span>מידע נוסף</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
