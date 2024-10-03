import { useState, useEffect } from 'react';
import { Client } from '../../types/Client';

export function useListClients() {
    const [clients, setClients] = useState<Client[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchClients() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/list`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: Client[] = await res.json();
                setClients(data);
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
        fetchClients();
    }, []);

    return { clients, loading, error };
}