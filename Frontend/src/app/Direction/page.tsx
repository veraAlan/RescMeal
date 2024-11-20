"use client";
import React, { useEffect, useState } from 'react';
import DirectionsComponent from "../../components/Map/Direction";
import MatrixComponent from "../../components/Map/Matrix"; 
import Link from 'next/link';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface Business {
    id: number;
    address_long: number;
    address_lat: number;
    name: string;
    type: string;
    address: string;
    phone: string;
    schedule: string;
}

interface Purchase {
    id: number;
    address_long: number;
    address_lat: number;
    address: string;
}

const DirectionPage: React.FC = () => {
    const searchParams = useSearchParams();
    const purchaseId = searchParams.get('purchaseId');

    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [stops, setStops] = useState<[number, number][]>([]);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocationAndStops = async () => {
            try {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        setCurrentLocation([position.coords.longitude, position.coords.latitude]);
                    },
                    error => {
                        console.error("Error al obtener la ubicación:", error);
                    }
                );

                const token = localStorage.getItem('authToken'); // O el almacenamiento que uses

                const businessResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/business/list`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const businesses = businessResponse.data._embedded?.businessList || businessResponse.data.content || businessResponse.data;

                const purchaseResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase/${purchaseId}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const purchaseData = purchaseResponse.data;

                if (Array.isArray(businesses) && purchaseData) {
                    const coordinates: [number, number][] = businesses.map((business: any) => {
                        const addressLong = Number(business.address_long);
                        const addressLat = Number(business.address_lat);
                        if (isNaN(addressLong) || isNaN(addressLat)) {
                            throw new Error("Invalid coordinates from API response");
                        }
                        return [addressLong, addressLat];
                    });

                    coordinates.push([purchaseData.address_long, purchaseData.address_lat]);

                    setStops(coordinates);
                    setBusinesses(businesses);
                    setPurchase(purchaseData);
                } else {
                    console.error('La respuesta de la API no es una matriz:', businesses, purchaseData);
                }
            } catch (error) {
                console.error('Error al recuperar las coordenadas de los negocios o la compra:', error);
            } finally {
                setLoading(false);
            }
        };

        if (purchaseId) {
            fetchLocationAndStops();
        }
    }, [purchaseId]);

    if (loading) return <p>Loading...</p>;
    if (!currentLocation) return <p>Error al obtener la ubicación. Asegúrate de haber otorgado permisos de geolocalización.</p>;
    if (!purchase) return <p>Error al obtener la información de la compra.</p>;

    const allStops = [currentLocation, ...stops];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-4">Mapa con Rutas de Mapbox</h1>
            <MatrixComponent stops={allStops} />
            <DirectionsComponent stops={allStops} businesses={businesses} />
            <div className="mt-4">
                <Link href="/delivery/takenOrders" legacyBehavior>
                    <a className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
                        Volver Atrás
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default DirectionPage;