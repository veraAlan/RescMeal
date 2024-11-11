"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDelivery from '../../hooks/Delivery/useDelivery';
import { getSessionId } from '../../utils/getSessionId';

const Page: React.FC = () => {
    const { deliveries, loading, error, setDeliveries } = useDelivery();
    const [carrierId, setCarrierId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCarrierId = async () => {
            try {
                const id = await getSessionId();
                setCarrierId(id);
            } catch (error) {
                console.error('Error obteniendo el ID del carrier:', error);
            }
        };

        fetchCarrierId();
    }, []);

    const handleTakeOrder = async (purchaseId: number) => {
        if (carrierId === null) {
            console.error('Carrier ID no disponible');
            alert('Carrier ID no disponible');
            return;
        }

        try {
            const token = localStorage.getItem('authToken'); // Obtener el token JWT
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/delivery`, {
                purchase: { id: purchaseId },
                carrier: { id: carrierId }, // Asegúrate de incluir el carrier ID aquí
                delivery_state: 'Tomado',
                delivery_time: new Date().toISOString().slice(11, 19), // Ajusta según tu necesidad
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                setDeliveries(prev => prev.filter(delivery => delivery.id !== purchaseId));
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
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Pedidos</h1>
            <div className="grid grid-cols-1 gap-4">
                {deliveries.map(purchase => (
                    <div key={purchase.id} className="bg-white p-4 rounded shadow-md">
                        <p><strong>Cliente:</strong> {purchase.client.name}</p>
                        <p><strong>Total:</strong> ${purchase.total_cost}</p>
                        <p><strong>Fecha de Creación:</strong> {purchase.creation_date}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={() => handleTakeOrder(purchase.id)}
                        >
                            Tomar Pedido
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;