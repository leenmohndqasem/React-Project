import React from 'react';
import { Card, Button } from 'flowbite-react';
import { HiHeart, HiOutlineHeart, HiTrash, HiPencil } from 'react-icons/hi';
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
      
      <div className="p-3 flex flex-col grow justify-between h-57.5">
        
        <div className="grow">
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-0.5 line-clamp-1">
            {book.title}
          </h5>
          <p className="text-xs font-medium text-pink-600 mb-2 line-clamp-1">
            By: {book.author}
          </p>

          <p className="font-normal text-gray-600 dark:text-gray-400 text-xs line-clamp-3">
            {book.description || "No description available for this book."}
          </p>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-auto" dir="ltr">
          
          {/* زر القلب */}
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

          <div className="flex gap-1.5">
            <Button size="xs" color="gray" onClick={() => onEdit(book)} className="flex items-center text-xs">
              <HiPencil className="mr-1 h-3.5 w-3.5" /> Edit
            </Button>
            <Button size="xs" color="failure" onClick={() => onDelete(book.id)} className="flex items-center text-xs">
              <HiTrash className="mr-1 h-3.5 w-3.5" /> Delete
            </Button>
          </div>

        </div>
      </div>

    </Card>
  );
}