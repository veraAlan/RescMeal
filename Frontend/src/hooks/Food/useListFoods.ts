import { useState, useEffect } from 'react';
import { Food } from '../../types/Food';

export function useListFoods() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFoods() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/food/list`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const result = await res.json();
                if (result) {
                    console.log('API Response:', result); // Depurar la respuesta de la API
                    const data: Food[] = result.map((item: any) => {
                        const business = item.business || {};
                        const imageUrl = item.image || '';
                        const fullImageUrl = imageUrl ? `/Food/${imageUrl}` : ''
                        console.log('Image URL:', fullImageUrl);
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
                                name: business.name,
                            },
                        };
                    });
                    setFoods(data);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }

        fetchFoods();
    }, []);

    return { foods, error };
}

export default useListFoods;