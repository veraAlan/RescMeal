"use client";
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
        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 bg-white mb-4 mx-auto min-h-[300px]">
            <img className="w-full h-48 object-cover md:w-48 md:h-auto" src={food.image} alt={food.name} />
            <div className="p-4 flex flex-col justify-between leading-normal flex-grow">
                <div>
                    <div className="text-gray-900 font-bold text-xl mb-2">{food.name}</div>
                    <div className="text-gray-700 text-sm mb-2">Negocio: {food.business.name}</div>
                    <p className="text-gray-700 text-base">{food.description}</p>
                </div>
                <div className="text-gray-500 text-sm mt-2">
                    <p>Categoría: {food.category}</p>
                    <p>Cantidad: {food.quantity}</p>
                    <p>Fecha de Expiración: {formatDate(food.expiration_date)}</p>
                    <p>Fecha de Producción: {formatDate(food.production_date)}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">${food.price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
};

export default FoodCard;
