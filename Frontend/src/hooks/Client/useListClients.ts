import { useState, useEffect } from 'react';
import { Client } from '../../types/Client';
import axios from 'axios';

export function useListClients() {
    const [clients, setClients] = useState<Client[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchClients() {
            console.log("Client call.")
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client`, { headers: {}, withCredentials: true })
                    .then(response => {
                        console.log("Client: ", response)
                        const data: Client[] = response.data
                        setClients(data)
                    })
                    .catch(e => console.error("Error fetching clients: ", e))
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