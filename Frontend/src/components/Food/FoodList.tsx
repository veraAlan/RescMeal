import React from 'react';
import { useListFoods } from '../../hooks/Food/useListFoods';
import { Food } from '../../types/Food';

const FoodList: React.FC = () => {
    const { foods, loading, error } = useListFoods();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading foods: {error}</p>;
    }

    if (!foods || foods.length === 0) {
        return <div className="text-center text-gray-500">No foods available</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Platillos</h2>
            <ul className="space-y-2">
                {foods.map(({ id, name, category, price, image, description, quantity, expiration_date, production_date }) => (
                    <li key={id} className="border p-2 rounded shadow-sm">
                        <p><strong>Nombre:</strong> {name}</p>
                        <p><strong>Categoría:</strong> {category}</p>
                        <p><strong>Precio:</strong> {price}</p>
                        <p><strong>Descripción:</strong> {description}</p>
                        <p><strong>Cantidad:</strong> {quantity}</p>
                        <p><strong>Fecha de Expiración:</strong> {expiration_date}</p>
                        <p><strong>Fecha de Producción:</strong> {production_date}</p>
                        {image && (
                            <img
                                src={image}
                                alt={`${name} logo.`}
                                className="mt-2"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodList;

