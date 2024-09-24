import React, { useState } from 'react';
import FoodCard from './FoodCard';
import { foodData } from '../../data';

const Searcher = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFoods = foodData.filter((food) =>
        food.food_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                placeholder="Buscar alimentos..."
                value={searchTerm}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFoods.map((food) => (
                    <FoodCard key={food.id_food} food={food} />
                ))}
            </div>
        </div>
    );
};

export default Searcher;
