import React from 'react';
import { Card, Button } from 'flowbite-react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; 
import { HiTrash, HiPencil } from 'react-icons/hi';

export default function BookCard({ book, onDelete, onEdit, onToggleFavorite }) {
  return (
    <Card className="w-full max-w-sm h-[480px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img 
        src={book.coverImage || "https://picsum.photos/200/300"} 
        alt={book.title} 
        className="h-44 w-full object-cover"
      />
      
      <div className="p-2 flex flex-col flex-grow justify-between">
        
        <div>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1 line-clamp-1">
            {book.title}
          </h5>
          <p className="text-sm font-medium text-pink-600 mb-2 line-clamp-1">
            By: {book.author}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-sm line-clamp-3">
            {book.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3 mt-auto" dir="ltr">
          <button 
            onClick={() => onToggleFavorite(book)} 
            className="text-3xl focus:outline-none transition-transform duration-200 hover:scale-110"
          >
            {book.isFavorite ? (
              <AiFillHeart className="text-red-500 filter drop-shadow-md" />
            ) : (
              <AiOutlineHeart className="text-gray-400 hover:text-red-500" />
            )}
          </button>

          <div className="flex gap-2">
            <Button size="xs" color="gray" onClick={() => onEdit(book)} className="flex items-center">
              <HiPencil className="mr-1 h-4 w-4" /> Edit
            </Button>
            <Button size="xs" color="failure" onClick={() => onDelete(book.id)} className="flex items-center">
              <HiTrash className="mr-1 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>

      </div>
    </Card>
  );
}