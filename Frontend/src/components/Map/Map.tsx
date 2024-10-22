
import React from 'react';
import useMap from '../../hooks/Map/useMap';
import { SearchBox } from '@mapbox/search-js-react';

const MapComponent = () => {
    const {
        mapContainerRef,
        mapInstanceRef,
        mapLoaded,
        inputValue,
        setInputValue,
        token
    } = useMap();

    return (
        <div>
            {mapLoaded && (
                <SearchBox
                    accessToken={token}
                    onChange={(value) => {
                        setInputValue(value);
                    }}
                    value={inputValue}
                    map={mapInstanceRef.current}
                    mapboxgl={mapInstanceRef}
                />
            )}
            <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default MapComponent;