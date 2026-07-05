import React from 'react';
import { Card, Button } from 'flowbite-react';
import { HiHeart, HiOutlineHeart, HiTrash, HiPencil } from 'react-icons/hi';

export default function BookCard({ book, onDelete, onEdit, onToggleFavorite }) {
  return (
    <Card className="max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img 
        src={book.coverImage || "https://picsum.photos/200/300"} 
        alt={book.title} 
        className="h-48 w-full object-cover"
      />
      <div className="p-1">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
          {book.title}
        </h5>
        <p className="text-sm font-medium text-pink-600 mb-2">
          By: {book.author}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-sm line-clamp-3 mb-4">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between mt-4 border-t pt-3" dir="ltr">
          <button 
            onClick={() => onToggleFavorite(book)} 
            className="text-2xl focus:outline-none transition-colors duration-200"
          >
            {book.isFavorite ? (
              <HiHeart className="text-red-500 hover:text-red-600" />
            ) : (
              <HiOutlineHeart className="text-gray-400 hover:text-red-500" />
            )}
          </button>

          <div className="flex gap-2">
            <Button size="xs" color="gray" onClick={() => onEdit(book)}>
              <HiPencil className="mr-1 h-4 w-4" /> Edit
            </Button>
            <Button size="xs" color="failure" onClick={() => onDelete(book.id)}>
              <HiTrash className="mr-1 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}