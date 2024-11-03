import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const useMapboxDirections = (stops: [number, number][], accessToken: string) => {
    const [directions, setDirections] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const coordinates = stops.map(stop => `${stop[0]},${stop[1]}`).join(';');

        const fetchDirections = async () => {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?access_token=${accessToken}&steps=true&geometries=geojson&overview=full`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch directions');
                }

                const data = await response.json();
                console.log(data); // Verifica la respuesta

                setDirections(data.routes[0].geometry.coordinates);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchDirections();
    }, [stops, accessToken]);

    return { directions, error };
};

export default useMapboxDirections;