import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface UseMapCoordinatesProps {
    lat: number;
    lng: number;
}

const useMapCoordinates = ({ lat, lng }: UseMapCoordinatesProps) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Set Mapbox access token
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

        // Initialize the map
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 12
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
    }, [lat, lng]);

    return {
        mapContainerRef,
        mapInstanceRef,
        mapLoaded,
        mapboxgl
    };
};

export default useMapCoordinates;