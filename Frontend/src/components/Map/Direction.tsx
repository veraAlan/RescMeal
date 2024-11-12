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
            stops.forEach((stop, index) => {
                new mapboxgl.Marker()
                    .setLngLat(stop)
                    .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`Parada ${index + 1}`)) // Añadir un popup a cada marker
                    .addTo(map);
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
                console.log('No hay direcciones disponibles.'); // Mensaje de depuración
            }

            return () => map.remove(); // Limpiar el mapa al desmontar
        }
    }, [directions, error, stops]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-4">Mapa con Rutas de Mapbox</h1>
            <div id="instructions" className="mt-4"></div>
            <div ref={mapContainer} className="w-full h-[600px] border-2 border-blue-500 rounded-lg shadow-lg" /> {/* Ajustar la altura a 600px */}
        </div>
    );
};

export default Map;