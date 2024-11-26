import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const useMap = ({ businessId }: { businessId: number }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Set Mapbox access token
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

        // Initialize the map
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/syaitul/cm2i59b8z002101pecb7e8u3i',
            center: [-45.5, -75], // posición inicial del mapa [lng, lat]
            zoom: 12, // zoom inicial
        });

        // Set map loaded state
        mapInstanceRef.current.on("load", () => {
            setMapLoaded(true);
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/business/${businessId}`, { withCredentials: true })
                .then(response => {
                    if (response.data && response.data.address_long && response.data.address_long) setAddress(response.data.address_long + "," + response.data.address_lat);
                })
                .catch(e => console.error("Error: ", e))
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const setAddress = async (address: string) => {
        try {
            // Realiza una solicitud a la API de Mapbox Geocoding
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`);
            const data = await response.json();

            if (data.features && data.features.length > 0) {
                const [lng, lat] = data.features[0].geometry.coordinates;

                // Centrar el mapa en la nueva ubicación
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo({
                        center: [lng, lat],
                        zoom: 15,
                        essential: true, // esta opción permite que la animación sea esencial para la interacción del usuario.
                        maxDuration: 50
                    });
                    new mapboxgl.Marker()
                        .setLngLat([lng, lat])
                        .addTo(mapInstanceRef.current);
                }

                setInputValue(address);
            } else {
                console.error("No se encontraron resultados para la dirección proporcionada.");
            }
        } catch (error) {
            console.error("Error al buscar la dirección:", error);
        }
    };

    return {
        mapContainerRef,
        mapInstanceRef,
        mapLoaded,
        inputValue,
        setInputValue,
        mapboxgl
    };
};

export default useMap;