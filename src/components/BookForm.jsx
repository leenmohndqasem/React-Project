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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="title" value="Book Title" />
        </div>
        <TextInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
        />
      </div>

      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="author" value="Author" />
        </div>
        <TextInput
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          required
        />
      </div>

      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter book description..."
        />
      </div>

      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="coverImage" value="Cover Image URL" />
        </div>
        <TextInput
          id="coverImage"
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4 border-t pt-4 border-gray-100 dark:border-gray-700">
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="purple">
          {initialBook ? 'Update Book' : 'Add Book'}
        </Button>
      </div>
    </form>
  );
}