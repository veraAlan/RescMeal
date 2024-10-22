import React from 'react';
import useMap from '../../hooks/Map/useMap';
import { SearchBox } from '@mapbox/search-js-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const business = {
    address: "Rio Negro 488 Neuquen" 
};

const MapComponent = () => {
    const {
        mapContainerRef,
        mapInstanceRef,
        mapLoaded,
        inputValue,
        setInputValue,
        token,
        mapboxgl
    } = useMap(business); // Pasamos el objeto business al hook

    return (
        <div>
            <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
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
    );
};

export default MapComponent;
