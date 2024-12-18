import { useState, useEffect, useCallback } from 'react';
import axiosConfig from '../../utils/axiosConfig';
import { Delivery } from '../../types/Delivery';
import { toast } from 'react-toastify';

export const useTakenOrders = () => {
    const [takenOrders, setTakenOrders] = useState<Delivery[]>([]);
    const [carrierId, setCarrierId] = useState<number | null>(null);

    const fetchCarrierId = useCallback(async () => {
        try {
            const response = await axiosConfig.get(`/api/auth/me`);
            const { carrier } = response.data;
            if (carrier) {
                setCarrierId(carrier.id);
            } else {
                console.error('No carrier information found');
            }
        } catch (error) {
            console.error('Error obteniendo el ID del carrier:', error);
        }
    }, []);

    const fetchTakenOrders = useCallback(async () => {
        if (carrierId === null) return;
        try {
            const response = await axiosConfig.get(`/api/delivery/list`);
            const filteredOrders = response.data.filter((order: Delivery) =>
                order.carrier &&
                order.carrier.id === carrierId &&
                order.delivery_state === 'Tomado'
            );
            setTakenOrders(filteredOrders);
        } catch (error) {
            console.error('Error al cargar los pedidos tomados:', error);
        }
    }, [carrierId]);

    const handleCompleteDelivery = async (orderId: number) => {
        try {
            const currentTime = new Date().toLocaleTimeString('es-AR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const orderToUpdate = takenOrders.find(order => order.id === orderId);

            if (!orderToUpdate) {
                console.error('Orden no encontrada');
                return;
            }

            const updatedOrder = {
                ...orderToUpdate,
                waiting_time: currentTime,
                delivery_state: 'Terminado'
            };

            await axiosConfig.put(`/api/delivery/${orderId}`, updatedOrder);

            setTakenOrders(takenOrders.filter(order => order.id !== orderId));
            toast.success('Entrega finalizada');
            toast.success('Recorrido terminado');
        } catch (error) {
            toast.error('Error al completar la entrega');
            console.error('Error al completar la entrega:', error);
        }
    };

    useEffect(() => {
        fetchCarrierId();
    }, [fetchCarrierId]);

    useEffect(() => {
        fetchTakenOrders();
    }, [carrierId, fetchTakenOrders]);

    return { takenOrders, setTakenOrders, handleCompleteDelivery };
};
