"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import { useTakenOrders } from '../../hooks/Delivery/useTakenOrders';

const TakenOrders: React.FC = () => {
    const { takenOrders, setTakenOrders, handleCompleteDelivery } = useTakenOrders();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedClient, setSelectedClient] = useState<string>('');

    const uniqueClients = Array.from(new Set(takenOrders.map(order => order.purchase.client.name)));

    const handleClearSearch = () => {
        setSearchTerm('');
        setSelectedClient('');
    };

    const filteredOrders = takenOrders.filter(order =>
        (order.purchase.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.purchase.purchasedItems.some(item => item.food.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (selectedClient ? order.purchase.client.name === selectedClient : true)
    );

    if (takenOrders.length === 0) return (
        <div className="flex flex-col items-center justify-center h-screen pt-20">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">No has tomado ningún pedido aún.</h2>
            <p className="text-lg text-gray-500">Por favor, selecciona un pedido para ver los detalles aquí.</p>
            <ToastContainer />
        </div>
    );

    return (
        <div className="container mx-auto px-4 pt-20">
            <ToastContainer />
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Pedidos Tomados</h1>

            <div className="w-full max-w-4xl mb-4 mx-auto flex flex-col md:flex-row md:items-center md:justify-center relative space-y-2 md:space-y-0 md:space-x-2">
                <div className="relative w-full flex">
                    <input
                        type="text"
                        placeholder="Buscar por cliente o producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="shadow-lg appearance-none border border-blue-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-300 pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="mb-8 flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-4">
                <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="shadow-lg appearance-none border border-blue-300 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-300"
                >
                    <option value="">Seleccionar cliente</option>
                    {uniqueClients.map((client, index) => (
                        <option key={index} value={client}>{client}</option>
                    ))}
                </select>
                <button
                    onClick={handleClearSearch}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
                >
                    Limpiar
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredOrders.length === 0 ? (
                    <div className="text-center text-lg text-gray-500">
                        No se encontraron pedidos que coincidan con los criterios de búsqueda.
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-full max-w-4xl mx-auto">
                            <p className="text-lg"><strong>Cliente:</strong> {order.purchase.client.name}</p>
                            <p className="text-lg"><strong>Total de la Compra:</strong> ${order.purchase.total_cost}</p>
                            <p className="text-lg"><strong>Items:</strong></p>
                            <ul className="ml-6">
                                {order.purchase.purchasedItems.map(item => (
                                    <li key={item.food.id} className="text-lg">
                                        {'name' in item.food ? item.food.name : `Food ID: ${item.food.id}`} - Cantidad: {item.quantity} - Precio: ${item.price}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg"><strong>Tomado a las</strong> {order.delivery_time}</p>
                            <div className="flex justify-between mt-4">
                                <Link href={`/Direction?purchaseId=${order.purchase.id}`} legacyBehavior>
                                    <a  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
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
                    ))
                )}
            </div>
        </div>
    );
};

export default TakenOrders;