import { useState, useEffect } from 'react';

const useMatrixData = (stops: [number, number][], accessToken: string) => {
    const [matrixDistance, setDistance] = useState<number | null>(null);
    const [matrixDuration, setDuration] = useState<number | null>(null);
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

                let totalDuration = 0;
                let totalDistance = 0;


                for (let i = 1; i < data.durations[0].length; i++) {
                    totalDuration += data.durations[0][i];
                }

                for (let i = 1; i < data.distances[0].length; i++) {
                    totalDistance += data.distances[0][i];
                }
                setDuration(totalDuration);
                setDistance(totalDistance);
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
