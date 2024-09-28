import React from 'react';
import { foodData } from '../../data';
import FoodCard from './FoodCard';

const FoodList = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Platillos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {foodData.map((food) => (
                    <FoodCard key={food.id_food} food={food} />
                ))}
            </div>
        </div>
    );
};

export default FoodList;

