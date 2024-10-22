import { useEffect, useState } from 'react';
import axios from 'axios';
import { Purchase } from '../../types/Purchase';

const useDelivery = () => {
    const [deliveries, setDeliveries] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase/list`, {
                    withCredentials: true
                });
                const data = response.data;
                const filteredDeliveries = data.filter((delivery: Purchase) => delivery.pickup);
                setDeliveries(filteredDeliveries);
            } catch (err) {
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { deliveries, loading, error, setDeliveries };
};

export default useDelivery;