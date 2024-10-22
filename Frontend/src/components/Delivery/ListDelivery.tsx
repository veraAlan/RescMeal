import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDelivery from '../../hooks/Delivery/useDelivery';
import { getSessionId } from '../../utils/getSessionId';

const ListDelivery: React.FC = () => {
    const { deliveries, loading, error, setDeliveries } = useDelivery();
    const [takenOrders, setTakenOrders] = useState<number[]>([]);
    const [carrierId, setCarrierId] = useState<number | null>(null);
    const [takenDeliveryIds, setTakenDeliveryIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchCarrierId = async () => {
            try {
                const id = await getSessionId();
                setCarrierId(id);
            } catch (error) {
                console.error('Error obteniendo el ID del carrier:', error);
            }
        };

        const fetchTakenDeliveries = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/delivery/list`, {
                    withCredentials: true
                });
                const takenIds = response.data.map((delivery: { purchase_id: number }) => delivery.purchase_id);
                setTakenDeliveryIds(takenIds);
            } catch (error) {
                console.error('Error obteniendo los pedidos tomados:', error);
            }
        };

        fetchCarrierId();
        fetchTakenDeliveries();
    }, []);

    const handleTakeOrder = async (purchaseId: number) => {
        if (carrierId === null) {
            alert('Carrier ID no disponible');
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/delivery`, {
                purchase: { id: purchaseId },
                carrier: { id: carrierId },
                address: '789 Oak St',
                delivery_time: '12:00:00',
                arrival_time: '12:30:00',
                waiting_time: '00:10:00',
                delivery_state: 'En Camino',
                tip: 0,
            }, {
                withCredentials: true,
            });
            if (response.status === 200) {
                setDeliveries(prev => prev.filter(delivery => delivery.id !== purchaseId));
                setTakenOrders(prev => [...prev, purchaseId]);
                setTakenDeliveryIds(prev => [...prev, purchaseId]);
                alert('Pedido tomado con éxito');
            } else {
                alert('Error al tomar el pedido');
            }
        } catch (err) {
            console.error('Error al tomar el pedido:', err);
            alert('Error al tomar el pedido');
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Pickups</h1>
            <div className="grid grid-cols-1 gap-4">
                {deliveries
                    .filter(delivery => !takenDeliveryIds.includes(delivery.id))
                    .map(delivery => (
                        <div key={delivery.id} className="bg-white p-4 rounded shadow-md">
                            <p><strong>ID:</strong> {delivery.id}</p>
                            <p><strong>Cliente:</strong> {delivery.client.name}</p>
                            <p><strong>Total:</strong> ${delivery.total_cost}</p>
                            <p><strong>Fecha de Creación:</strong> {delivery.creation_date}</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                onClick={() => handleTakeOrder(delivery.id)}
                            >
                                Tomar Pedido
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListDelivery;