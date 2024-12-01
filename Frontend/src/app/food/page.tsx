'use client';
import React, { useContext, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import Search from '../../components/Search/Search';
import FoodCard from '../../components/Food/FoodCard';
import useListFoods from '../../hooks/Food/useListFoods';
import useSearch from '../../hooks/Search/Search';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Food } from '../../types/Food';

const HomePage: React.FC = () => {
    const { foods, error } = useListFoods();
    const { filteredFoods, handleSearch } = useSearch(foods as Food[]);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            redirect('/auth/login');
        }
    }, []);

    if (!authContext?.isLoggedIn) {
        return <div>Redirigiendo...</div>;
    }

    const foodsByBusiness = filteredFoods.reduce((acc: Record<string, Food[]>, food: Food) => {
        if (!acc[food.business.name]) {
            acc[food.business.name] = [];
        }
        acc[food.business.name].push(food);
        return acc;
    }, {});

    return (
        <div className="container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800" style={{ marginBottom: '2rem' }}>Comidas</h1>
            <div className="w-full max-w-4xl mb-4">
                <Search onSearch={handleSearch} />
            </div>
            {Object.keys(foodsByBusiness).length === 0 ? (
                <p className="text-center text-gray-500">No se encontró la comida.</p>
            ) : (
                <div className="flex flex-col items-center w-full max-w-4xl">
                    {Object.entries(foodsByBusiness).map(([businessName, foods]) => (
                        <div key={businessName} className="mb-8 w-full">
                            <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-white mb-6 p-6 flex justify-between items-center">
                                <span className="font-semibold text-2xl text-gray-800">Negocio: {businessName}</span>
                                <a href={'/Map/' + foods[0].business.id} className="flex items-center justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-blue-500 border-blue-500 transition duration-300">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </a>
                            </div>
                            <div className="w-full max-w-4xl">
                                {foods.map((food) => (
                                    <FoodCard key={food.id} food={food} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;