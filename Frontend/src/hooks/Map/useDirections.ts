// hooks/useMapboxDirections.ts
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const useMapboxDirections = (start: [number, number], end: [number, number], accessToken: string) => {
    const [directions, setDirections] = useState<any>(null);
    const [error, setError] = useState<string | null>(null); // Explicitly define error as a string or null

    useEffect(() => {
        const coordinates = `${start[0]},${start[1]};${end[0]},${end[1]}`;

        const fetchDirections = async () => {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving?access_token=${accessToken}`;
            const body = new URLSearchParams({
                coordinates,
                steps: 'true',
                waypoints: '0;1', // Asumiendo que solo hay dos puntos
            });

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: body.toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch directions');
                }

                const data = await response.json();
                console.log(data); // Agregado para verificar la respuesta
                setDirections(data.routes[0].geometry.coordinates);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchDirections();
    }, [start, end, accessToken]);

    return { directions, error };
};

export default useMapboxDirections;
