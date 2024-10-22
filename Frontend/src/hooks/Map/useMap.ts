
// hooks/useMap.ts
import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Token de MapBox 
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const useMap = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Set Mapbox access token
        mapboxgl.accessToken = token;

        // Initialize the map
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/syaitul/cm2i59b8z002101pecb7e8u3i',
            center: [-45.5, -75], // posición inicial del mapa [lng, lat]
            zoom: 5, // zoom inicial
        });

        // Set map loaded state
        mapInstanceRef.current.on("load", () => {
            setMapLoaded(true);
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return {
        mapContainerRef,
        mapInstanceRef,
        mapLoaded,
        inputValue,
        setInputValue,
        token
    };
};

export default useMap;