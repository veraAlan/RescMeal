import { useEffect, useState } from 'react';
import axios from 'axios';
import { Purchase } from '../../types/Purchase';

const useDelivery = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const [purchasesResponse, takenIdsResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase/list`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    }),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/delivery/taken`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    })
                ]);

                const purchases: Purchase[] = purchasesResponse.data;
                const takenDeliveries: { purchase: { id: number } }[] = takenIdsResponse.data;

                const takenIds = takenDeliveries.map(delivery => delivery.purchase.id);

                const availablePurchases = purchases.filter(purchase => !takenIds.includes(purchase.id));
                setPurchases(availablePurchases);
            } catch (err) {
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { purchases, loading, error, setPurchases };
};

export default useDelivery;