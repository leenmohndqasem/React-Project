import React from 'react';
import { HiSearch } from 'react-icons/hi';

export default function SearchBar({ value, onChange }) {
  return (

    <div className="relative w-full">
      
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <HiSearch className="h-5 w-5 text-gray-400" />
      </div>
      
      <input
        type="text"
        id="search"
        placeholder="Search books by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm text-gray-900 shadow-xs focus:border-pink-500 focus:outline-hidden focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-500 transition-all duration-200"
      />
      
    </div>
  );
}