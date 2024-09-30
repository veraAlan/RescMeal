import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard';

const FoodSearcherAndList = () => {
    const [foods, setFoodList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:8080/api/foods/list')
            .then(response => response.json())
            .then(data => {
                setFoodList(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching food list:', error);
                setLoading(false);
            });
    }, []);

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Buscar Platillos</h1>
            <input
                type="text"
                placeholder="Buscar..."
                className="border p-2 w-full mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFoods.map((food) => (
                    <FoodCard key={food.id} food={food} />
                ))}
            </div>
        </div>
    );
};

export default FoodSearcherAndList;
