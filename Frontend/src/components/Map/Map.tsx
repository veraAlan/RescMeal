import React from 'react';
import useMap from '../../hooks/Map/useMap';
import { SearchBox } from '@mapbox/search-js-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ id }: { id: number }) => {
    const {
        mapContainerRef,
        mapInstanceRef,
        mapLoaded,
        inputValue,
        setInputValue,
        mapboxgl
    } = useMap({ businessId: id }); // Pasamos el objeto business al hook

    return (
        <div className="container mx-auto py-8">
            <div className="hidden">
                {mapLoaded && (
                    <SearchBox
                        accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''}
                        onChange={(value) => {
                            setInputValue(value);
                        }}
                        value={inputValue}
                        map={mapInstanceRef.current}
                        mapboxgl={mapboxgl}
                        marker
                    />
                )}
            </div>
            <div ref={mapContainerRef} className="w-full h-96 border-2 border-blue-500 rounded-lg shadow-lg mb-4" />
            <a href='/'>
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                    Volver al home
                </button>
            </a>
        </div>
    );
};

export default MapComponent;