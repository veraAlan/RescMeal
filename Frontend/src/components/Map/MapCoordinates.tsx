import React, { useEffect } from 'react';
import useMapCoordinates from '../../hooks/Map/useMapCoordinates';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapCoordinates = ({ lat, lng }: { lat: number; lng: number }) => {
    const {
        mapContainerRef,
        mapInstanceRef,
        mapLoaded,
        mapboxgl
    } = useMapCoordinates({ lat, lng });

    useEffect(() => {
        if (mapLoaded && mapInstanceRef.current) {
            mapInstanceRef.current.flyTo({
                center: [lng, lat],
                zoom: 15
            });

            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapInstanceRef.current);
            mapInstanceRef.current.dragPan.disable(); 
            mapInstanceRef.current.scrollZoom.disable();
        }
    }, [mapLoaded, lat, lng, mapboxgl]);

    return (
        <div ref={mapContainerRef} className="w-full h-full border-2 border-blue-500 rounded-lg shadow-lg" />
    );
};

export default MapCoordinates;