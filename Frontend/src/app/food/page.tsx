'use client'
import React from 'react'
import Search from '../../components/Search/Search'
import FoodCard from '../../components/Food/FoodCard'
import useListFoods from '../../hooks/Food/useListFoods'
import useSearch from '../../hooks/Search/Search'

const HomePage: React.FC = () => {
    const { foods, error } = useListFoods()
    const { filteredFoods, handleSearch } = useSearch(foods)

    return (
        <div className="container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Comidas</h1>
            <div className="w-full max-w-4xl mb-4">
                <Search onSearch={handleSearch} />
            </div>
            {filteredFoods.length === 0 ? (
                <p className="text-center text-gray-500">No se encontró la comida.</p>
            ) : (
                <div className="flex flex-col items-center w-full max-w-4xl">
                    {filteredFoods.map((food) => (
                        <FoodCard key={food.id} food={food} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage
