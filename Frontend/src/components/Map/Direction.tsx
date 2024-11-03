import React, { useEffect, useRef } from 'react';
import mapboxgl, { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import useMapboxDirections from '../../hooks/Map/useDirections';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

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

            // Marcar los puntos de inicio y paso
            stops.forEach((stop) => {
                new mapboxgl.Marker().setLngLat(stop).addTo(map);
            });

            // Manejo de error
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
                            'line-color': '#888',
                            'line-width': 8,
                        },
                    });

                    // Ajustar el mapa a la ruta
                    const bounds = new mapboxgl.LngLatBounds();
                    route.forEach((coord: LngLatLike | LngLatBoundsLike) => bounds.extend(coord));
                    map.fitBounds(bounds, { padding: 20 });
                });
            } else {
                console.log('No hay direcciones disponibles.'); // Mensaje de depuración
            }

            return () => map.remove(); // Limpiar el mapa al desmontar
        }
    }, [directions, error, stops]);

    return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default Map;