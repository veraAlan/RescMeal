'use client'
import React from 'react';
import Direction from "../../components/Map/Direction";
import Matrix from "../../components/Map/Matrix";


const Home: React.FC = () => {
    const stops: [number, number][] = [
        [-68.0598, -38.9543], // Coordenadas de inicio
        [-68.0622, -38.9627], // Primera parada
        [-68.0561, -38.9577], // Segunda parada
        [-68.0532, -38.9452], // Tercera parada
        // Agrega más puntos aquí
    ];

    return (
        <div>
            <Matrix stops={stops}/>
            <Direction stops={stops} />
        </div>
    );
};

export default Home;