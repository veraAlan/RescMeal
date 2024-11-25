"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Purchase {
    id: number;
    total_cost: number;
    creation_date: string;
    purchasedItems: PurchasedItem[];
    // Otros campos relevantes
}

interface PurchasedItem {
    id: number;
    business: Business;
    // Otros campos relevantes
}

interface Business {
    id: number;
    image: string;
    name: string;
    type: string;
    address: string;
    address_lat: number;
    address_long: number;
    phone: string;
    schedule: string;
    cvu: string;
}

interface Carrier {
    id: number;
    // Otros campos relevantes
}

const Page: React.FC = () => {
    const [clientId, setClientId] = useState<number | null>(null);
    const [lastPurchase, setLastPurchase] = useState<Purchase | null>(null);
    const [carrier, setCarrier] = useState<Carrier | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true });
                setClientId(response.data.client.id);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        const fetchLastPurchase = async () => {
            if (clientId !== null) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase/last/${clientId}`, { withCredentials: true });
                    setLastPurchase(response.data);
                } catch (error) {
                    console.error('Failed to fetch last purchase:', error);
                }
            }
        };

        fetchUser();
        fetchLastPurchase();
    }, [clientId]);

    useEffect(() => {
        const fetchCarrier = async () => {
            if (lastPurchase !== null) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/delivery/carrierByPurchase/${lastPurchase.id}`, { withCredentials: true });
                    setCarrier(response.data);
                } catch (error) {
                    console.error('Failed to fetch carrier data:', error);
                }
            }
        };

        fetchCarrier();
    }, [lastPurchase]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">¡Bienvenido a mi página!</h1>
            {clientId !== null ? (
                <div>
                    <p className="text-lg">ID del Cliente: {clientId}</p>
                    {lastPurchase ? (
                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold">Última Compra:</h2>
                            <p className="text-lg">ID: {lastPurchase.id}</p>
                            <p className="text-lg">Costo Total: {lastPurchase.total_cost}</p>
                            <p className="text-lg">Fecha: {new Date(lastPurchase.creation_date).toLocaleDateString()}</p>
                            <div className="mt-4">
                                <h2 className="text-2xl font-semibold">Información de los Negocios:</h2>
                                {lastPurchase.purchasedItems.map(item => (
                                    <div key={item.business.id} className="mt-2">
                                        <h3 className="text-xl font-semibold">Negocio ID: {item.business.id}</h3>
                                        <p className="text-lg">Nombre: {item.business.name}</p>
                                        <p className="text-lg">Tipo: {item.business.type}</p>
                                        <p className="text-lg">Dirección: {item.business.address}</p>
                                        <p className="text-lg">Teléfono: {item.business.phone}</p>
                                        <p className="text-lg">Horario: {item.business.schedule}</p>
                                    </div>
                                ))}
                            </div>
                            {carrier ? (
                                <div className="mt-4">
                                    <h2 className="text-2xl font-semibold">Información del Carrier:</h2>
                                    <p className="text-lg">ID: {carrier.id}</p>
                                    {/* Otros campos relevantes */}
                                </div>
                            ) : (
                                <p className="text-xl">Cargando información del carrier...</p>
                            )}
                        </div>
                    ) : (
                        <p className="text-xl">Cargando la última compra...</p>
                    )}
                </div>
            ) : (
                <p className="text-xl">Cargando información del usuario...</p>
            )}
        </div>
    );
};

export default Page;