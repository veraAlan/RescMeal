import { useState, useEffect } from 'react';

const useMatrixData = (stops: [number, number][], accessToken: string) => {
    const [matrixDistance, setDistance] = useState<String | null>(null);
    const [matrixDuration, setDuration] = useState<String | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    console.log("Esto es stops: " + stops);

    useEffect(() => {
        const coordinates = stops.map(stop => `${stop[0]},${stop[1]}`).join(';');
        const fetchMatrixData = async () => {
            try {
                const response = await fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}?sources=0&annotations=distance,duration&access_token=${accessToken}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const duration = data.durations[0][1] + data.durations[0][2] + data.durations[0][3];
                const distance = data.distances[0][1] + data.distances[0][2] + data.distances[0][3];
                setDuration(duration);
                setDistance(distance);
            } catch (error) {

                setError((error as Error).message); 
            } finally {
                setLoading(false);
            }
        };

        fetchMatrixData();
    }, []);

    return { matrixDuration, matrixDistance, loading, error };
};

export default useMatrixData;
