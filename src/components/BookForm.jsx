import React, { useState, useEffect, useRef } from 'react';

export default function BookForm({ show, onClose, onSave, currentBook }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    isFavorite: false
  });

  const dialogRef = useRef(null);

  useEffect(() => {
    if (currentBook) {
      setFormData(currentBook);
    } else {
      setFormData({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        isFavorite: false
      });
    }
  }, [currentBook, show]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (show) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [show]);

  const handleFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!formData.title || !formData.author || !formData.coverImage) {
      alert("Please fill in all required fields: Title, Author, and Image URL");
      return;
    }
    
    onSave(formData);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 m-auto w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700 backdrop:bg-black/50 backdrop:backdrop-blur-xs focus:outline-hidden"
    >
      
      <div className="mb-5 flex items-center justify-between border-b pb-3 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {currentBook ? '📝 Edit Book Details' : ' Add A New Book'}
        </h3>
        <button 
          onClick={(e) => { e.preventDefault(); onClose(); }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold text-xl transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Book Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-pink-400 focus:outline-hidden focus:ring-2 focus:ring-pink-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
            placeholder="Example : Nineteen Eighty-Four"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Author Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.author || ''}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-pink-400 focus:outline-hidden focus:ring-2 focus:ring-pink-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
            placeholder="Example : George Orwell"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Cover Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={formData.coverImage || ''}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-pink-400 focus:outline-hidden focus:ring-2 focus:ring-pink-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
            placeholder=" Put a link here"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 shadow-sm dark:text-gray-500 mb-1">
            Short Description <span className="text-xs font-normal text-gray-400">(Optional)</span>
          </label>
          <textarea
            rows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-pink-400 focus:outline-hidden focus:ring-2 focus:ring-pink-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
            placeholder="Write a brief summary of the book..."
          />
        </div>
  
        <div className="flex justify-end gap-2 pt-4 border-t dark:border-gray-700">
          <button 
            onClick={(e) => { e.preventDefault(); onClose(); }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={handleFormSubmit}
            className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-600 focus:outline-hidden focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-colors cursor-pointer"
          >
            Save Book
          </button>
        </div>
      </div>

    </dialog>
  );
}