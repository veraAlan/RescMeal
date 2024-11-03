'use client'
import React from 'react';
import Direction from "../../components/Map/Direction";

const Home: React.FC = () => {
    const stops: [number, number][] = [
        [2.344003, 48.85805], // Coordenadas de inicio
        [2.34955, 48.86084],  // Primera parada
        [2.35222, 48.85661],  // Segunda parada
        // Agrega más puntos aquí
    ];

    return (
        <div>
            <h1>Mapa con Rutas de Mapbox</h1>
            <Direction stops={stops} />
        </div>
    );
};

export default Home;