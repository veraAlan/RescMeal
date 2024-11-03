'use client'
import React from 'react';
import Direction from "../../components/Map/Direction";

const Home: React.FC = () => {
    const start: [number, number] = [2.344003, 48.85805]; // Coordenadas de inicio (lng, lat)
    const end: [number, number] = [2.34955, 48.86084]; // Coordenadas de fin (lng, lat)

    return (
        <div>
            <h1>Mapa con Rutas de Mapbox</h1>
            <Direction start={start} end={end} />
        </div>
    );
};

export default Home;
