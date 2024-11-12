import useMatrixData from '../../hooks/Map/useMatrix';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapProps {
    stops: [number, number][];
}

const MatrixDataComponent: React.FC<MapProps> = ({ stops }) => {
    const { matrixDuration,
        matrixDistance,
        loading,
        error
    } = useMatrixData(stops, mapboxgl.accessToken);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const time = Math.floor(matrixDuration / 60);
    const distance = Math.floor(matrixDistance / 1000);
    return (
        <div>
            <div>
                <h3>Tiempo del recorrido {time} min</h3>
                <h3>Distancia total {distance} km</h3>
            </div >
        </div>
    );
};

export default MatrixDataComponent;
