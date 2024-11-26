import React, { useEffect, useRef } from 'react';
import mapboxgl, { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import useMapboxDirections from '../../hooks/Map/useDirections';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// interface Business {
//     address_long: number;
//     address_lat: number;
//     name: string;
//     type: string;
//     address: string;
//     phone: string;
//     schedule: string;
// }

interface MapProps {
    stops: [number, number][];
}

const Map: React.FC<MapProps> = ({ stops }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const { directions, error } = useMapboxDirections(stops, mapboxgl.accessToken);

    useEffect(() => {
        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: stops[0], // Centrar en el primer punto
                zoom: 12,
            });

            if (error) {
                console.error('Error al obtener direcciones:', error);
                return;
            }

            // Si hay direcciones, dibujar la ruta
            if (directions) {
                map.on('load', () => {
                    const route = directions.map((coord: number[]) => [coord[0], coord[1]]);

                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: route,
                            },
                        },
                    });

                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round',
                        },
                        paint: {
                            'line-color': '#007cbf',
                            'line-width': 4,
                        },
                    });

                    map.addControl(
                        new mapboxgl.GeolocateControl({
                            positionOptions: {
                                enableHighAccuracy: true
                            },
                            trackUserLocation: true,
                            showUserHeading: true
                        })
                    );

                    // Ajustar el mapa a la ruta
                    const bounds = new mapboxgl.LngLatBounds();
                    route.forEach((coord: LngLatLike | LngLatBoundsLike) => bounds.extend(coord));
                    map.fitBounds(bounds, { padding: 20 });
                });
            } else {
                console.log('No hay direcciones disponibles.');
            }

            return () => map.remove(); // Limpiar el mapa al desmontar
        }
    }, [directions, error, stops]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-4">Mapa con Rutas de Mapbox</h1>
            <div ref={mapContainer} className="w-full h-[600px] border-2 border-blue-500 " />
        </div>
    );
};

export default Map;