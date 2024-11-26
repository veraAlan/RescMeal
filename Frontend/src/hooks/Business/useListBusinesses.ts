import { useState, useEffect } from 'react';
import { Business } from '../../types/Business';

export function useListBusinesses() {
    const [businesses, setBusinesses] = useState<Business[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBusinesses() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business/list`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: Business[] = await res.json();
                setBusinesses(data);
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
        fetchBusinesses();
    }, []);

    return { businesses, loading, error };
}