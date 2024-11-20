"use client";
import React, { useState, useEffect } from 'react';
import useDelivery from '../../hooks/Delivery/useDelivery';
import { getSessionId } from '../../utils/getSessionId';
import Link from 'next/link';
import axios from 'axios';
import ListDelivery from '../../components/Delivery/ListDelivery';

const Page: React.FC = () => {
    const { purchases, loading, error, setPurchases } = useDelivery();
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
            const token = localStorage.getItem('authToken');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/delivery`, {
                purchase: { id: purchaseId },
                carrier: { id: carrierId },
                delivery_state: 'Tomado',
                delivery_time: new Date().toISOString().slice(11, 19),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true,
            });
    
            if (response.status === 200) {
                setPurchases(prev => prev.filter(purchase => purchase.id !== purchaseId));
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
            <ListDelivery purchases={purchases} handleTakeOrder={handleTakeOrder} />
            <div className="mt-4 flex justify-center">
                <Link href="/">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded">Volver a la página principal</button>
                </Link>
            </div>
        </div>
    );
};

export default Page;