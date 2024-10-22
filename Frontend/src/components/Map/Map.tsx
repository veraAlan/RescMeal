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
        token,
        mapboxgl
    } = useMap({ businessId: id }); // Pasamos el objeto business al hook

    return (
        <div>
            <div hidden>
                {mapLoaded && (
                    <SearchBox
                        accessToken={token}
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
            <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
            <a href='/'>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Volver al home
                </button>
            </a>
        </div>
    );
};

export default MapComponent;
