import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchBox } from '@mapbox/search-js-react';

// Token de MapBox 
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

/* TODO faltaria refactorizar esto para pasarlo a un hook y un component bien hecho en una pagina 
que traiga un business y carge en el value 
la direccion de modo que automaticamente el mapa cargue la visualizacion
*/
const MapView: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (!mapContainerRef.current) return; 

        // Set Mapbox access token
        mapboxgl.accessToken = token;

        // Initialize the map
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, 
            style: 'mapbox://styles/syaitul/cm2i59b8z002101pecb7e8u3i',
            center: [-45.5, -75], // map inicial position  [lng, lat]
            zoom: 5, // inicial zoom 
        });

        // Set map loaded state
        mapInstanceRef.current.on("load", () => {
            setMapLoaded(true);
        });

        
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            {mapLoaded && (
                <SearchBox
                    accessToken={token}
                    map={mapInstanceRef.current}
                    mapboxgl={mapboxgl}
                    value={inputValue}
                    onChange={(d) => {
                        setInputValue(d);
                    }}
                    marker
                />
            )}
            <div id="map-container" ref={mapContainerRef} style={{ height: '300px', width: '100%' }} />
        </div>
    );
};

export default MapView;