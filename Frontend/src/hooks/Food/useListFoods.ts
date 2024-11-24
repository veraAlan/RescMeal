import { useState, useEffect } from 'react';
import { Food } from '../../types/Food';
import axiosConfig from '@/utils/axiosConfig';

export function useListFoods() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFoods() {
            await axiosConfig.get(`/api/food/list`)
                .then(response => {
                    const result = response.data;
                    if (result) {
                        const data: Food[] = result.map((item: any) => {
                            const business = item.business || {};
                            const imageUrl = item.image || '';
                            const fullImageUrl = imageUrl ? `/Food/${imageUrl}` : ''
                            // Formatear fechas
                            const formattedExpirationDate = item.expiration_date ? item.expiration_date.split('T')[0] : '';
                            const formattedProductionDate = item.production_date ? item.production_date.split('T')[0] : '';

                            return {
                                id: item.id,
                                name: item.name,
                                category: item.category,
                                price: item.price,
                                image: fullImageUrl,
                                description: item.description,
                                quantity: item.quantity,
                                expiration_date: formattedExpirationDate,
                                production_date: formattedProductionDate,
                                business: {
                                    id: business.id,
                                    name: business.name
                                },
                            };
                        });
                        setFoods(data);
                    }
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                })
        }

        fetchFoods();
    }, []);

    return { foods, error };
}

export default useListFoods;