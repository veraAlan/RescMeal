import { useEffect, useState } from 'react';
import axios from 'axios';
import { Purchase } from '../../types/Purchase';
import { Delivery } from '../../types/Delivery'; // Asegúrate de que la ruta es correcta

const useDelivery = () => {
    const [deliveries, setDeliveries] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Obtener el token JWT
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
                const takenDeliveries: Delivery[] = takenIdsResponse.data;

                const takenIds = takenDeliveries.map(delivery => delivery.purchase.id);

                const availablePurchases = purchases.filter(purchase => !takenIds.includes(purchase.id));
                setDeliveries(availablePurchases);
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