"use client";
import React, { useState, useEffect } from 'react';
import useDelivery from '../../hooks/Delivery/useDelivery';
import { getSessionId } from '../../utils/getSessionId';
import Link from 'next/link';
import axios from 'axios';
import ListDelivery from '../../components/Delivery/ListDelivery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page: React.FC = () => {
    const { purchases, loading, error, setPurchases } = useDelivery();
    const [carrierId, setCarrierId] = useState<number | null>(null);
    const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null);

    useEffect(() => {
        const fetchCarrierId = async () => {
            try {
                const id = await getSessionId();
                setCarrierId(id);
            } catch (error) {
                console.error('Error obteniendo el ID del carrier:', error);
            }
        };

        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        setCoords({ lat: latitude, lon: longitude });
                    },
                    error => {
                        console.error('Error obteniendo la ubicación:', error);
                    }
                );
            } else {
                console.error('La geolocalización no es compatible con este navegador.');
            }
        };

        fetchCarrierId();
        fetchLocation();
    }, []);

    const handleTakeOrder = async (purchaseId: number) => {
        if (carrierId === null || coords === null) {
            console.error('Carrier ID o coordenadas no disponibles');
            toast.error('Carrier ID o coordenadas no disponibles');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/delivery`, {
                purchase: { id: purchaseId },
                carrier: { id: carrierId },
                delivery_state: 'Tomado',
                delivery_time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
                address_lat: coords.lat,
                address_long: coords.lon
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true,
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
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="container mx-auto px-4">
            <ToastContainer />
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Pedidos</h1>
            {purchases.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-2xl font-semibold text-gray-500">No hay pedidos disponibles</p>
                    </div>
                </div>
            ) : (
                <ListDelivery purchases={purchases} handleTakeOrder={handleTakeOrder} />
            )}
            <div className="mt-4 flex justify-center">
                <Link href="/">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded">Volver a la página principal</button>
                </Link>
            </div>
        </div>
    );
};

export default Page;