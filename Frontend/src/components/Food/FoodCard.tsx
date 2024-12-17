'use client';
import React from 'react';
import { Food } from '../../types/Food';
import { useCart } from '../../hooks/Cart/useCart';
import { toast } from 'react-toastify';

interface FoodCardProps {
    food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(food);
        toast.success(`${food.name} se añadió al carrito!`);
    };

    return (
        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 bg-white mb-6 mx-auto min-h-[300px]">
            <img className="w-full h-48 object-cover md:w-48 md:h-auto" src={food.image} alt={food.name} />
            <div className="p-6 flex flex-col justify-between leading-normal flex-grow">
                <div>
                    <div className="text-gray-800 font-bold text-3xl mb-2">{food.name}</div>
                    <p className="text-gray-700 text-lg">{food.description}</p>
                </div>
                <div className="text-gray-600 text-lg mt-4 space-y-1">
                    <p><span className="font-semibold">Categoría:</span> {food.category}</p>
                    <p><span className="font-semibold">Cantidad:</span> {food.quantity}</p>
                    <p><span className="font-semibold">Fecha de Expiración:</span> {food.expiration_date}</p>
                    <p><span className="font-semibold">Fecha de Producción:</span> {food.production_date}</p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <div>
                        <span className="text-gray-500 text-xl line-through">${(food.price * 2).toFixed(2)}</span>
                        <span className="text-gray-800 font-bold text-3xl ml-2">${food.price}</span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
