"use client";
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { SearchBox } from '@mapbox/search-js-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

if (!accessToken) {
    throw new Error("Mapbox access token is not defined in the environment variables.");
}

mapboxgl.accessToken = accessToken;

interface AddressPickerProps {
    setAddress: (address: string) => void;
    setAddressLat: (lat: number) => void;
    setAddressLong: (lng: number) => void;
}

const AddressPicker: React.FC<AddressPickerProps> = ({ setAddress, setAddressLat, setAddressLong }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (mapInstanceRef.current) return;

        const initializeMap = () => {
            mapInstanceRef.current = new mapboxgl.Map({
                container: mapContainerRef.current!,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-68.0591, -38.9517],
                zoom: 12,
            });

            mapInstanceRef.current.on('load', () => {
                setMapLoaded(true);
                setAddressLat(-38.9517);
                setAddressLong(-68.0591);
                setAddress('Neuquén Capital');
            });

            mapInstanceRef.current.on('click', async (e) => {
                const { lng, lat } = e.lngLat;

                // Eliminar el marcador anterior si existe
                if (markerRef.current) {
                    markerRef.current.remove();
                }

                // Crear un nuevo marcador
                const newMarker = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(mapInstanceRef.current!);
                markerRef.current = newMarker;

                // Actualizar estado
                setAddressLat(lat);
                setAddressLong(lng);

                try {
                    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`);
                    const data = await response.json();
                    let address = data.features[0]?.place_name || 'Dirección desconocida';
                    if (address.length > 255) {
                        address = address.substring(0, 255); // Limitar la longitud de la dirección
                    }
                    // Eliminar "Neuquén, Neuquén, Q8300, Argentina" de la dirección
                    address = address.replace(/Neuquén, Neuquén, Q8300, Argentina/g, '').trim();
                    // Eliminar cualquier coma adicional al inicio o al final de la dirección
                    address = address.replace(/^,|,$/g, '').trim();
                    setAddress(address);
                } catch (error) {
                    console.error('Error fetching address:', error);
                    setAddress('Dirección desconocida');
                }
            });
        };

        initializeMap();
    }, [setAddress, setAddressLat, setAddressLong]);

    return (
        <div className="relative">
            <div className="absolute top-2 left-2 right-2 z-10">
                {mapLoaded && (
                    <SearchBox
                        accessToken={accessToken}
                        map={mapInstanceRef.current}
                        mapboxgl={mapboxgl}
                        value={inputValue}
                        onChange={(value) => setInputValue(value)}
                        marker={true}
                    />
                )}
            </div>
            <div ref={mapContainerRef} className="w-full h-96 mt-12" />
        </div>
    );
};

export default AddressPicker;