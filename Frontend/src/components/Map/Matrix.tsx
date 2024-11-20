import useMatrixData from '../../hooks/Map/useMatrix';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapProps {
    stops: [number, number][];
}

const MatrixComponent: React.FC<MapProps> = ({ stops }) => {
    const { matrixDuration, matrixDistance, loading, error } = useMatrixData(stops, mapboxgl.accessToken);

    if (loading) return <p>Loading...</p>;
    if (error || matrixDuration === null || matrixDistance === null) return <p>Error: {error}</p>;
    
    const totalTime = Math.floor(matrixDuration / 60);
    const totalDistance = Math.floor(matrixDistance / 1000);

    return (
        <div className="mt-4 text-center">
            <p>Tiempo total del recorrido: <strong>{totalTime} min</strong></p>
            <p>Distancia total: <strong>{totalDistance} km</strong></p>
        </div>
    );
};

export default MatrixComponent;