import { useState, useEffect, useMemo } from 'react';
import { Food } from '../../types/Food';

const useSearch = (foods: Food[]) => {
    const [query, setQuery] = useState('');
    const [filteredFoods, setFilteredFoods] = useState<Food[]>(foods);

    useEffect(() => {
        setFilteredFoods(foods);
    }, [foods]);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery.toLowerCase());
    };

    const filteredFoodsMemo = useMemo(() => {
        if (!query) {
            return foods.filter(food => food.quantity > 0);
        }
        return foods.filter(food =>
            food.quantity > 0 && (
                food.name?.toLowerCase().includes(query) ||
                food.description?.toLowerCase().includes(query) ||
                food.category?.toLowerCase().includes(query) ||
                food.business?.name?.toLowerCase().includes(query))
        );
    }, [query, foods]);

    useEffect(() => {
        setFilteredFoods(filteredFoodsMemo);
    }, [filteredFoodsMemo]);

    return { filteredFoods, handleSearch };
};

export default useSearch;
