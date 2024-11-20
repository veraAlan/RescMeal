"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Delivery } from '../../../types/Delivery';
import { getSessionId } from '../../../utils/getSessionId';
import Link from 'next/link';

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

        fetchCarrierId();
    }, []);

    useEffect(() => {
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

        if (carrierId !== null) {
            fetchTakenOrders();
        }
    }, [carrierId]);

    const handleCompleteDelivery = (orderId: number) => {
        // Lógica para completar la entrega
        console.log(`Completar entrega para el pedido con ID: ${orderId}`);
    };

    if (takenOrders.length === 0) return <p>No hay pedidos tomados.</p>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Pedidos Tomados</h1>
            <div className="grid grid-cols-1 gap-4">
                {takenOrders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        <p className="text-lg"><strong>Cliente:</strong> {order.purchase.client.name}</p>
                        <p className="text-lg"><strong>Total:</strong> ${order.purchase.total_cost}</p>
                        <p className="text-lg"><strong>Fecha de Creación:</strong> {new Date(order.purchase.creation_date).toLocaleDateString()}</p>
                        <p className="text-lg"><strong>Items:</strong></p>
                        <ul className="ml-6">
                            {order.purchase.purchasedItems.map(item => (
                                <li key={item.food.id} className="text-lg">
                                    { 'name' in item.food ? item.food.name : `Food ID: ${item.food.id}` } - Cantidad: {item.quantity} - Precio: ${item.price}
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg"><strong>Estado de Entrega:</strong> {order.delivery_state}</p>
                        <p className="text-lg"><strong>Hora de Entrega:</strong> {order.delivery_time}</p>
                        <div className="flex justify-between mt-4">
                            <Link href={`/Direction?purchaseId=${order.purchase.id}`} legacyBehavior>
                                <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                                    Ver mi Ruta
                                </a>
                            </Link>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                                onClick={() => handleCompleteDelivery(order.id)}
                            >
                                Terminar Entrega
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TakenOrdersPage;