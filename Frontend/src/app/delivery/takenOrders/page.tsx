"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Delivery } from '../../../types/Delivery';
import { getSessionId } from '../../../utils/getSessionId';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    const filteredOrders = response.data.filter((order: Delivery) => 
                        order.carrier && 
                        order.carrier.id === carrierId && 
                        order.delivery_state === 'Tomado'
                    );
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

    const handleCompleteDelivery = async (orderId: number) => {
        try {
            const currentTime = new Date().toLocaleTimeString();
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

            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/delivery/${orderId}`, updatedOrder, {
                withCredentials: true
            });

            setTakenOrders(takenOrders.filter(order => order.id !== orderId));
            toast.success('Entrega finalizada');
            console.log(`Entrega terminada para el pedido con ID: ${orderId}`);
        } catch (error) {
            toast.error('Error al completar la entrega');
            console.error('Error al completar la entrega:', error);
        }
    };

    if (takenOrders.length === 0) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">No has tomado ningún pedido aún.</h2>
            <p className="text-lg text-gray-500">Por favor, selecciona un pedido para ver los detalles aquí.</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Pedidos Tomados</h1>
            <div className="grid grid-cols-1 gap-4">
                {takenOrders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        <p className="text-lg"><strong>Cliente:</strong> {order.purchase.client.name}</p>
                        <p className="text-lg"><strong>Total de la Compra:</strong> ${order.purchase.total_cost}</p>
                        <p className="text-lg"><strong>Items:</strong></p>
                        <ul className="ml-6">
                            {order.purchase.purchasedItems.map(item => (
                                <li key={item.food.id} className="text-lg">
                                    { 'name' in item.food ? item.food.name : `Food ID: ${item.food.id}` } - Cantidad: {item.quantity} - Precio: ${item.price}
                                </li>
                            ))}
                        </ul>
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
            <ToastContainer />
        </div>
    );
};

export default TakenOrdersPage;