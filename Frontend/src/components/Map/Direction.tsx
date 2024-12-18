"use client";
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const Direction: React.FC = () => {
    const searchParams = useSearchParams();
    const purchaseId = searchParams.get('purchaseId');
    const [purchase, setPurchase] = useState<any>(null);
    const [carrier, setCarrier] = useState<any>(null);
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [businesses, setBusinesses] = useState<any[]>([]);
    const [distance, setDistance] = useState<number | null>(null);
    const [duration, setDuration] = useState<{ hours: number; minutes: number; totalMinutes: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setCurrentLocation([position.coords.longitude, position.coords.latitude]);
                setLoading(false);
            },
            error => {
                console.error("Error al obtener la ubicación:", error);
                setLoading(false);
            }
        );
    }, []);

    useEffect(() => {
        if (currentLocation && mapContainer.current && !map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/syaitul/cm2i59b8z002101pecb7e8u3i',
                center: currentLocation,
                zoom: 14
            });

            new mapboxgl.Marker()
                .setLngLat(currentLocation)
                .addTo(map.current);

            const geolocateControl = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            });

            map.current.addControl(geolocateControl, 'top-right');
        }
    }, [currentLocation]);

    const fetchPurchase = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/purchase/${purchaseId}`, {
                withCredentials: true,
            });
            setPurchase(response.data);
        } catch (error) {
            console.error('Error al obtener la información de la compra:', error);
        }
    };

    useEffect(() => {
        if (purchaseId) {
            fetchPurchase();
        }
    }, [purchaseId]);

    const fetchCarrier = async () => {
        try {
            const carrierResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/delivery/carrierByPurchase/${purchase.id}`, {
                withCredentials: true,
            });
            setCarrier(carrierResponse.data);
        } catch (error) {
            console.error('Error al obtener la información del carrier:', error);
        }
    };

    const setUniqueBusinesses = () => {
        if (purchase) {
            const uniqueBusinesses = purchase.purchasedItems.reduce((acc: any[], item: any) => {
                if (!acc.find((business: any) => business.id === item.business.id)) {
                    acc.push(item.business);
                }
                return acc;
            }, []);
            setBusinesses(uniqueBusinesses);
        }
    };

    useEffect(() => {
        if (purchase) {
            fetchCarrier();
            setUniqueBusinesses();
        }
    }, [purchase]);

    const fetchRoute = async (waypoints: [number, number][]) => {
        try {
            const coordinates = waypoints.map(point => `${point[0]},${point[1]}`).join(';');
            const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
            const route = response.data.routes[0].geometry;
            const distance = response.data.routes[0].distance / 1000;
            const durationInMinutes = response.data.routes[0].duration / 60;

            const hours = Math.floor(durationInMinutes / 60);
            const minutes = Math.floor(durationInMinutes % 60);

            const duration = { hours, minutes, totalMinutes: durationInMinutes };

            if (map.current) {
                map.current.on('load', () => {
                    if (map.current && map.current.isStyleLoaded()) {
                        if (map.current.getSource('route')) {
                            (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
                        } else {
                            map.current.addLayer({
                                id: 'route',
                                type: 'line',
                                source: {
                                    type: 'geojson',
                                    data: route
                                },
                                layout: {
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                },
                                paint: {
                                    'line-color': '#3887be',
                                    'line-width': 5,
                                    'line-opacity': 0.75
                                }
                            });
                        }
                        map.current.fitBounds([route.coordinates[0], route.coordinates[route.coordinates.length - 1]], { padding: 50 });

                        businesses.forEach((business: any) => {
                            const marker = new mapboxgl.Marker()
                                .setLngLat([business.address_long, business.address_lat]);

                            if (map.current) {
                                marker.addTo(map.current);
                            }

                            const popup = new mapboxgl.Popup({ offset: 25 })
                                .setHTML(`
                                    <h3>${business.name}</h3>
                                    <p><strong>Tipo:</strong> ${business.type}</p>
                                    <p><strong>Dirección:</strong> ${business.address}</p>
                                    <p><strong>Teléfono:</strong> ${business.phone}</p>
                                    <p><strong>Horario:</strong> ${business.schedule}</p>
                                `);

                            marker.setPopup(popup);

                            popup.on('open', () => {
                                const closeButton = document.querySelector('.mapboxgl-popup-close-button');
                                if (closeButton) {
                                    closeButton.removeAttribute('aria-hidden');
                                    closeButton.setAttribute('inert', 'true');
                                }
                            });
                        });
                    }
                });
            }

            return { distance, duration };

        } catch (error) {
            console.error('Error al obtener la ruta:', error);
        }
    };

    useEffect(() => {
        if (currentLocation && businesses.length > 0) {
            const waypoints: [number, number][] = businesses.map((business: any) => [business.address_long, business.address_lat]);
            waypoints.unshift(currentLocation);
            waypoints.push([purchase.address_long, purchase.address_lat]);
            fetchRoute(waypoints).then(routeInfo => {
                if (routeInfo) {
                    setDistance(routeInfo.distance);
                    setDuration(routeInfo.duration);
                }
            });
        }
    }, [currentLocation, businesses]);

    if (!purchaseId) {
        return <p>ID de la compra no especificado.</p>;
    }
    if (!purchase) {
        return <p>Cargando información de la compra...</p>;
    }
    if (!currentLocation) {
        return <p>Error al obtener la ubicación. Asegúrate de haber otorgado permisos de geolocalización.</p>;
    }

    return (
        <div className="mt-16">
            {loading && (
                <div className="flex justify-center items-center">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            )}
            {!loading && distance !== null && duration !== null && (
                <div className="flex flex-col items-center mb-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full container mx-auto py-8 relative mt-32">
                    <h2 className="text-2xl font-bold mb-4">Recorrido del Viaje</h2>
                    <p className="text-lg font-semibold"><strong>Distancia Total:</strong> {distance.toFixed(2)} km</p>
                    {duration.hours > 0 ? (
                        <p className="text-lg font-semibold"><strong>Tiempo Estimado:</strong> {`${duration.hours} horas y ${duration.minutes} minutos`}</p>
                    ) : (
                        <p className="text-lg font-semibold"><strong>Tiempo Estimado:</strong> {`${duration.totalMinutes.toFixed(0)} minutos`}</p>
                    )}
                </div>
            )}
            <div className="container mx-auto py-8 relative mt-16">
                <div ref={mapContainer} className="w-full h-[600px] border-2 border-blue-500 rounded-lg shadow-lg mapboxgl-map" />
            </div>
            <div className="flex justify-center items-center mt-4">
                <Link href="/delivery/takenOrders" legacyBehavior>
                    <a className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
                        Volver Atrás
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Direction;