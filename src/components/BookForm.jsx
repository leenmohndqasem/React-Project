import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

export default function BookForm({ onSubmit, initialBook, onClose }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setCoverImage('');
  }, [initialBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedBook = {

      ...(initialBook && { id: initialBook.id, isFavorite: initialBook.isFavorite }), 
      title: title.trim() ? title.trim() : (initialBook ? initialBook.title : ''),
      author: author.trim() ? author.trim() : (initialBook ? initialBook.author : ''),
      description: description.trim() ? description.trim() : (initialBook ? initialBook.description : ''),
      coverImage: coverImage.trim() ? coverImage.trim() : (initialBook ? initialBook.coverImage : ''),
    };
    
    onSubmit(updatedBook);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Book Title" />
        </div>
        <TextInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={initialBook ? initialBook.title : "Enter book title"}
          required={!initialBook} 
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="author" value="Author" />
        </div>
        <TextInput
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder={initialBook ? initialBook.author : "Enter author name"}
          required={!initialBook}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={initialBook ? initialBook.description : "Enter book description..."}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="coverImage" value="Cover Image URL" />
        </div>
        <TextInput
          id="coverImage"
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder={initialBook ? initialBook.coverImage : "https://example.com/image.jpg"}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
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