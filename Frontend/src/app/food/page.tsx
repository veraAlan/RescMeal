'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Search from '../../components/Search/Search'
import FoodCard from '../../components/Food/FoodCard'
import useListFoods from '../../hooks/Food/useListFoods'
import useSearch from '../../hooks/Search/Search'
import { AiOutlineShop } from 'react-icons/ai'
import { Food, FoodPage } from '../../types/Food'

const HomePage: React.FC = () => {
    const { foods } = useListFoods()
    const { filteredFoods, handleSearch } = useSearch(foods as FoodPage)
    const [selectedType, setSelectedType] = useState<string | null>(null)

    const authContext = useContext(AuthContext)
    if (!authContext?.isLoggedIn) return <div>Redirigiendo...</div>

    const handleTypeClick = (type: string | null) => {
        setSelectedType(type)
    }

    const filteredByType = selectedType
        ? filteredFoods.filter((food) => food.category === selectedType)
        : filteredFoods

    const foodsByBusiness = filteredByType.reduce((prevValue: Record<string, FoodPage>, food: Food) => {
        if (!prevValue[food.business.name]) {
            prevValue[food.business.name] = []
        }
        prevValue[food.business.name].push(food)
        return prevValue
    }, {})

    const foodTypes = Array.from(new Set(foods.map((food) => food.category)))

    return (
        <div className="container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800" style={{ marginBottom: '2rem' }}>Comidas</h1>
            <div className="w-full max-w-4xl mb-4">
                <Search onSearch={handleSearch} />
            </div>
            <div className="flex flex-wrap justify-center mb-4">
                {foodTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleTypeClick(type)}
                        className={`px-4 py-2 m-2 rounded-md ${selectedType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {type}
                    </button>
                ))}
                <button
                    onClick={() => handleTypeClick(null)}
                    className={`px-4 py-2 m-2 rounded-md ${selectedType === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Todos
                </button>
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
                                    <AiOutlineShop className="text-2xl" />
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
    )
}

export default HomePage