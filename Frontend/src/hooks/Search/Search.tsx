import { useState, useEffect } from 'react';
import { Food } from '../../types/Food';

const useSearch = (foods: Food[]) => {
    const [filteredFoods, setFilteredFoods] = useState<Food[]>(foods);

    useEffect(() => {
        setFilteredFoods(foods);
    }, [foods]);

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredFoods(foods);
            return;
        }

        const filtered = foods.filter((food) =>
            food.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFoods(filtered);
    };

    return { filteredFoods, handleSearch };
};

export default useSearch;