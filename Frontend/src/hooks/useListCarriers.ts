import { useState, useEffect } from 'react';
import { Carrier } from '../types/Carrier';

export function useListCarriers() {
    const [carriers, setCarriers] = useState<Carrier[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCarriers() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrier/list`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: Carrier[] = await res.json();
                setCarriers(data);
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
        fetchCarriers();
    }, []);

    return { carriers, loading, error };
}