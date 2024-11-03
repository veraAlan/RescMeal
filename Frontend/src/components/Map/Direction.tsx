import React, { useEffect, useRef } from 'react';
import mapboxgl, { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import useMapboxDirections from '../../hooks/Map/useDirections';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''; // Reemplaza con tu token

interface MapProps {
    start: [number, number];
    end: [number, number];
}

const Map: React.FC<MapProps> = ({ start, end }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const { directions, error } = useMapboxDirections(start, end, mapboxgl.accessToken);

    useEffect(() => {
        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2], // Centrar entre los dos puntos
                zoom: 12,
            });

            // Marcar los puntos de inicio y fin
            new mapboxgl.Marker().setLngLat(start).addTo(map);
            new mapboxgl.Marker().setLngLat(end).addTo(map);

            // Manejo de error
            if (error) {
                console.error('Error al obtener direcciones:', error);
                return;
            }
            console.log("Estos es directions: ")
            console.log(directions)
            // Si hay direcciones, dibujar la ruta
            if (directions) {
                map.on('load', () => {
                    const route = directions.map((coord: number[]) => [coord[0], coord[1]]);
                    console.log(route); // Verifica las coordenadas de la ruta

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
    }, [directions, error, start, end]);

    return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
