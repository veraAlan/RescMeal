import { useState, useEffect } from 'react';
import { Food } from '../../types/Food';

export function useListFoods() {
    const [foods, setFoods] = useState<Food[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFoods() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/food/list`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: Food[] = await res.json();
                setFoods(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchFoods();
    }, []);

    return { foods, loading, error };
}