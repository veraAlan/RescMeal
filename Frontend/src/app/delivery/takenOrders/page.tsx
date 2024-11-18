"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Delivery } from '../../../types/Delivery'; // Asegúrate de que la ruta es correcta
import { getSessionId } from '../../../utils/getSessionId';

const TakenOrdersPage: React.FC = () => {
    const [takenOrders, setTakenOrders] = useState<Delivery[]>([]);
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

        const fetchTakenOrders = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/delivery/list`, {
                    withCredentials: true
                });
                if (carrierId !== null) {
                    const filteredOrders = response.data.filter((order: Delivery) => order.carrier && order.carrier.id === carrierId && order.delivery_state === 'Tomado');
                    setTakenOrders(filteredOrders);
                }
            } catch (error) {
                console.error('Error al cargar los pedidos tomados:', error);
            }
        };

        fetchCarrierId().then(fetchTakenOrders);
    }, [carrierId]);

    if (takenOrders.length === 0) return <p>No hay pedidos tomados.</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Pedidos Tomados</h1>
            <div className="grid grid-cols-1 gap-4">
                {takenOrders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded shadow-md">
                        <p><strong>Carrier:</strong> {order.carrier ? order.carrier.name : 'Sin Carrier'}</p>
                        <p><strong>Cliente:</strong> {order.purchase.client.name}</p>
                        <p><strong>Total:</strong> ${order.purchase.total_cost}</p>
                        <p><strong>Fecha de Creación:</strong> {order.purchase.creation_date}</p>
                        <p><strong>Items:</strong></p>
                        <ul>
                            {order.purchase.purchasedItems.map(item => (
                                <li key={item.food.id}>
                                    { 'name' in item.food ? item.food.name : `Food ID: ${item.food.id}` } - Cantidad: {item.quantity} - Precio: ${item.price}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Estado de Entrega:</strong> {order.delivery_state}</p>
                        <p><strong>Hora de Entrega:</strong> {order.delivery_time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TakenOrdersPage;