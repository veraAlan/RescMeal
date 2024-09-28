import React from 'react';

const FoodCard = ({ food }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full" src={food.image} alt={food.food_name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{food.food_name}</div>
                <p className="text-gray-700 text-base">{food.description}</p>
                <p className="text-gray-900 font-bold">${food.price}</p>
                <p className="text-gray-600">Categoría: {food.category}</p>
                <p className="text-gray-600">Cantidad: {food.quantity}</p>
                <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" disabled>
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default FoodCard;

