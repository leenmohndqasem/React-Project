import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

export default function BookForm({ onSubmit, initialBook, onClose }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title || '');
      setAuthor(initialBook.author || '');
      setDescription(initialBook.description || '');
      setCoverImage(initialBook.coverImage || '');
    } else {
      setTitle('');
      setAuthor('');
      setDescription('');
      setCoverImage('');
    }
  }, [initialBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      ...(initialBook && { id: initialBook.id, isFavorite: initialBook.isFavorite }), 
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      coverImage: coverImage.trim(),
    };
    onSubmit(updatedBook);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left" dir="ltr">

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Book Title
        </Label>
        <TextInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="author" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Author Name
        </Label>
        <TextInput
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          required
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Description
        </Label>
        <Textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter book description..."
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-750 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="coverImage" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Cover Image URL
        </Label>
        <TextInput
          id="coverImage"
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-750 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-pink-500 rounded-xl hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-900 cursor-pointer transition-all shadow-xs"
        >
          {initialBook ? 'Update Book' : 'Add Book'}
        </button>
      </div>

    </form>
  );
}