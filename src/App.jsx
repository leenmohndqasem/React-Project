import React, { useState, useEffect } from 'react';
import { getBooks, createBook, deleteBook, updateBook } from './services/api';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      const data = response.data?.items || (Array.isArray(response.data) ? response.data : []);
      setBooks(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveBook = async (bookData) => {
    try {
      if (selectedBook) {

        await updateBook(selectedBook.id, bookData);
      } else {

        await createBook(bookData);
      }
      setIsModalOpen(false);
      setSelectedBook(null);
      await fetchBooks(); 
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save book. Please check your API connection.");
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleToggleFavorite = async (book) => {
    try {
      const updatedBook = { ...book, isFavorite: !book.isFavorite };
      await updateBook(book.id, updatedBook);
      await fetchBooks();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleAddClick = (e) => {
    if (e) e.preventDefault();
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const filteredBooks = Array.isArray(books) 
    ? books.filter(book => {
        const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFavorite = showFavoritesOnly ? book.isFavorite === true : true;
        return matchesSearch && matchesFavorite;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      
      <header className="bg-white dark:bg-gray-800 shadow-xs p-8 mb-8 border-b border-gray-100 dark:border-gray-700">
        <div className="container mx-auto flex flex-col items-center text-center gap-6">
          
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-pink-400 to-rose-400 tracking-tight drop-shadow-xs">
            My Book Archive 
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl">
            
            {/* شريط البحث */}
            <div className="w-full relative shadow-xs rounded-xl">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`h-11 flex items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap w-full sm:w-auto border shadow-xs ${
                  showFavoritesOnly 
                    ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
                }`}
              >
                <span className={showFavoritesOnly ? "text-white" : "text-red-500"}>❤︎</span>
                {showFavoritesOnly ? "Show All" : "Favorites"}
              </button>
              
              <button 
                onClick={handleAddClick} 
                className="h-11 flex items-center justify-center gap-2 rounded-full bg-pink-500 px-6 text-sm font-semibold text-white shadow-xs hover:bg-pink-600 transition-all duration-200 cursor-pointer whitespace-nowrap w-full sm:w-auto"
              >
                <span className="text-lg font-bold">+</span> Add Book
              </button>

            </div>

          </div>
          
        </div>
      </header>

      <main className="container mx-auto px-4">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={handleDeleteBook}
                onEdit={handleEditClick}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              {showFavoritesOnly ? (
                "No favorite books added yet. Go add some love !!!"
              ) : searchTerm ? (
                "Try again, maybe you wrote the wrong book name ! "
              ) : (
                "No books found or archive is empty. Add your first book! "
              )}
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            ©️ {new Date().getFullYear()} Book Archive. All Rights Reserved.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Designed & Developed by <span className="text-pink-500 dark:text-pink-400 font-semibold">Leen Kasem</span>
          </p>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-gray-950/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedBook(null);
            }}
          ></div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl relative z-10 border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-xl font-bold text-gray-950 dark:text-white flex items-center gap-2">
                {selectedBook ? '📝 Edit Book Details' : '✨ Add New Book'}
              </h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBook(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800">
              <BookForm
                initialBook={selectedBook} 
                onSubmit={handleSaveBook}
                onClose={() => {
                  setIsModalOpen(false);
                  setSelectedBook(null);
                }}
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}