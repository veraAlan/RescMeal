import React, { useState, useEffect } from 'react';
import { Purchase } from '../../types/Purchase';
import { FaSearch } from 'react-icons/fa';
import MapCoordinates from '../Map/MapCoordinates';
import normalizeDate from '../../utils/normalizeDate';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListDelivery = ({ purchases, loading, error, handleTakeOrder }: { purchases: Purchase[], loading: boolean, error: string | null, handleTakeOrder: (purchaseId: number) => void }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>(purchases);
    const [selectedClient, setSelectedClient] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');

    useEffect(() => {
        setFilteredPurchases(purchases);
    }, [purchases]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        filterPurchases(term, selectedClient, selectedDate);
    };

    const handleClientFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const client = event.target.value;
        setSelectedClient(client);
        filterPurchases(searchTerm, client, selectedDate);
    };

    const handleDateFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const date = event.target.value;
        setSelectedDate(date);
        filterPurchases(searchTerm, selectedClient, date);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedClient('');
        setSelectedDate('');
        setFilteredPurchases(purchases);
    };

    const filterPurchases = (term: string, client: string, date: string) => {
        let filtered = purchases;
        if (term) {
            filtered = filtered.filter(purchase =>
                purchase.client.name.toLowerCase().includes(term) ||
                normalizeDate(purchase.creation_date).includes(term)
            );
        }
        if (client) {
            filtered = filtered.filter(purchase => purchase.client.name === client);
        }
        if (date) {
            filtered = filtered.filter(purchase => normalizeDate(purchase.creation_date) === date);
        }
        setFilteredPurchases(filtered);
    };

    const uniqueClients = Array.from(new Set(purchases.map(purchase => purchase.client.name)));
    const uniqueDates = Array.from(new Set(purchases.map(purchase => normalizeDate(purchase.creation_date))));

    return (
<div className="container mx-auto px-4 mt-32">
    <ToastContainer />
    <h1 className="text-4xl font-bold my-4 text-center text-gray-800 mb-8">Pedidos</h1>

    <div className="w-full max-w-4xl mb-4 mx-auto flex flex-col md:flex-row md:items-center md:justify-center relative space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Buscar por cliente o fecha..."
                value={searchTerm}
                onChange={handleSearch}
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
            onChange={handleClientFilter}
            className="shadow-lg appearance-none border border-blue-300 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-300"
        >
            <option value="">Seleccionar cliente</option>
            {uniqueClients.map((client, index) => (
                <option key={index} value={client}>{client}</option>
            ))}
        </select>

        <select
            value={selectedDate}
            onChange={handleDateFilter}
            className="shadow-lg appearance-none border border-blue-300 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-300"
        >
            <option value="">Seleccionar fecha</option>
            {uniqueDates.map((date, index) => (
                <option key={index} value={date}>{date}</option>
            ))}
        </select>

        <button
            onClick={handleClearFilters}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
        >
            Limpiar
        </button>
    </div>

    {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
    ) : error ? (
        <p className="text-center text-red-500">{error}</p>
    ) : filteredPurchases.length === 0 ? (
        <p className="text-center text-gray-500">No hay pedidos disponibles</p>
    ) : (
        <div className="space-y-6 w-full max-w-4xl mx-auto">
            {filteredPurchases.map(purchase => (
                <div key={purchase.id} className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start md:space-x-6 w-full max-w-4xl">
                    <div className="flex-1 space-y-1 md:space-y-2">
                        <p className="text-lg font-semibold"><strong>Cliente:</strong> {purchase.client.name}</p>
                        <p className="text-lg"><strong>Total:</strong> ${purchase.total_cost}</p>
                        <p className="text-lg"><strong>Fecha:</strong> {normalizeDate(purchase.creation_date)}</p>
                        <button
                            className="bg-blue-500 text-white w-full md:w-auto px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                            onClick={() => handleTakeOrder(purchase.id)}
                        >
                            Tomar Pedido
                        </button>
                    </div>
                    <div className="w-full h-64 mt-4 md:mt-0 md:w-1/3 rounded overflow-hidden">
                        <MapCoordinates lat={purchase.address_lat} lng={purchase.address_long} />
                    </div>
                </div>
            ))}
        </div>
    )}

    <div className="mt-4 flex justify-center mb-16">
        <Link href="/food">
            <button className="bg-gray-500 text-white px-4 py-2 rounded">Volver</button>
        </Link>
    </div>
</div>




    );
};

export default ListDelivery;



