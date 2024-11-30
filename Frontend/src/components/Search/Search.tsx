import React, { useState } from 'react';

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div className="w-full flex items-center justify-center relative mb-4">
            <input
                type="text"
                placeholder="Buscar por nombre, descripción, categoría o negocio..."
                value={query}
                onChange={handleSearch}
                className="shadow-lg appearance-none border border-blue-300 rounded-l-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-300"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 transition-colors duration-300 shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M15.85 11a5.85 5.85 0 11-11.7 0 5.85 5.85 0 0111.7 0z"></path>
                </svg>
            </button>
        </div>
    );
};

export default Search;