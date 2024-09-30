import React from 'react';

const FoodCard = ({ food }) => {
    return (
        <div className="border p-4 rounded shadow-lg max-w-sm mx-auto">
            {food.foodPhoto ? (
                <img
                    src={`data:image/jpeg;base64,${food.foodPhoto.photo}`}
                    alt={`${food.foodName}`}
                    className="w-full h-48 object-cover mb-4 rounded"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded">
                    <span className="text-gray-500">No Image Available</span>
                </div>
            )}
            <h2 className="text-xl font-bold mb-2">{food.name}</h2>
            <p className="text-gray-700 mb-2"><strong>Descripción:</strong> {food.description}</p>
            <p className="text-gray-700 mb-2"><strong>Categoría:</strong> {food.category}</p>
            <p className="text-gray-700"><strong>Fecha de Vencimiento:</strong> {food.expiration_date}</p>
                <p className="text-gray-700"><strong>Cantidad:</strong> {food.quantity}</p>
                <p className="text-gray-700 sm:text-right"><strong>Precio:</strong> {food.price}</p>
            <div className="flex justify-end mt-4">
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed" disabled>
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
