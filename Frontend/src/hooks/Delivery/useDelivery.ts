import { useEffect, useState, useCallback } from 'react';
import axiosConfig from '../../utils/axiosConfig';
import { Purchase } from '../../types/Purchase';
import { getSessionId } from '../../utils/getSessionId';
import { toast } from 'react-toastify';

const useDelivery = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [carrierId, setCarrierId] = useState<number | null>(null);
    const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null);

    const fetchCarrierId = useCallback(async () => {
        try {
            const id = await getSessionId();
            setCarrierId(id);
        } catch (err) {
            console.error('Error obteniendo el ID del carrier:', err);
            toast.error('Error obteniendo el ID del carrier');
        }
    }, []);

    const fetchLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCoords({ lat: latitude, lon: longitude });
                },
                err => {
                    console.error('Error obteniendo la ubicación:', err);
                    toast.error('Error obteniendo la ubicación');
                }
            );
        } else {
            console.error('La geolocalización no es compatible con este navegador.');
            toast.error('La geolocalización no es compatible con este navegador.');
        }
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const [purchasesResponse, takenIdsResponse] = await Promise.all([
                axiosConfig.get(`/api/purchase/list`),
                axiosConfig.get(`/api/delivery/taken`)
            ]);

            const purchasesData: Purchase[] = purchasesResponse.data;
            const takenDeliveries: { purchase: { id: number } }[] = takenIdsResponse.data;

            const takenIds = takenDeliveries.map(delivery => delivery.purchase.id);
            const availablePurchases = purchasesData.filter(purchase => !takenIds.includes(purchase.id));
            setPurchases(availablePurchases);
        } catch (err) {
            console.error('Error al cargar los datos:', err);
            setError('Error al cargar los datos.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCarrierId();
        fetchLocation();
        fetchData();
    }, [fetchCarrierId, fetchLocation, fetchData]);

    const handleTakeOrder = useCallback(async (purchaseId: number) => {
        if (carrierId === null || coords === null) {
            console.error('Carrier ID o coordenadas no disponibles');
            toast.error('Carrier ID o coordenadas no disponibles');
            return;
        }

        try {
            const response = await axiosConfig.post(`/api/delivery`, {
                purchase: { id: purchaseId },
                carrier: { id: carrierId },
                delivery_state: 'Tomado',
                delivery_time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
                address_lat: coords.lat,
                address_long: coords.lon
            });

            if (response.status === 200) {
                setPurchases(prev => prev.filter(purchase => purchase.id !== purchaseId));
                toast.success('Pedido tomado con éxito');
            } else {
                toast.error('Error al tomar el pedido');
            }
        } catch (err) {
            console.error('Error al tomar el pedido:', err);
            toast.error('Error al tomar el pedido');
        }
    }, [carrierId, coords, setPurchases]);

    return { purchases, loading, error, handleTakeOrder };
};

export default useDelivery;