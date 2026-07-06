import React from 'react';
import { Card } from 'flowbite-react';
import { HiHeart, HiOutlineHeart, HiTrash, HiPencilAlt } from 'react-icons/hi'; 
export default function BookCard({ book, onDelete, onEdit, onToggleFavorite }) {
  return (
    <Card className="w-full max-w-sm h-115 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      <div className="h-44 w-full overflow-hidden bg-gray-100">
        <img 
          src={book.coverImage || "https://picsum.photos/200/300"} 
          alt={book.title} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="p-4 flex flex-col grow justify-between">
        
        <div className="grow">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1 line-clamp-1">
            {book.title}
          </h5>
          <p className="text-sm font-medium text-pink-600 mb-2 line-clamp-1">
            By: {book.author}
          </p>
          <p className="font-normal text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            {book.description || "No description available for this book."}
          </p>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-auto" dir="ltr">
          
          <button 
            onClick={() => onToggleFavorite(book)} 
            className="text-2xl focus:outline-none transition-transform duration-200 hover:scale-110"
          >
            {book.isFavorite ? (
              <HiHeart className="text-red-500" />
            ) : (
              <HiOutlineHeart className="text-gray-400 hover:text-red-500" />
            )}
          </button>

          <div className="flex items-center gap-3">

            <button 
              onClick={() => onEdit(book)} 
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 focus:outline-none flex items-center gap-1 text-sm font-medium"
              title="Edit Book"
            >
              <HiPencilAlt className="h-5 w-5" />
              <span>Edit</span>
            </button>

            <button 
              onClick={() => onDelete(book.id)} 
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors duration-200 focus:outline-none flex items-center gap-1 text-sm font-medium"
              title="Delete Book"
            >
              <HiTrash className="h-5 w-5" />
              <span>Delete</span>
            </button>
          </div>

        </div>
      </div>

    </Card>
  );
}