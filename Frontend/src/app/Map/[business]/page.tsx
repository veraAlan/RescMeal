'use client'
import React from 'react';
import Map from '@/components/Map/Map';

//TODO esta deberia ser una pagina que visualice un bussines especifico junto al mapa
// Aca pueden probar el mapa, revisar el tiempo de carga porque hay veces que el servidor se muere
export default function Page({ params }: { params: { business: number } }) {
    return (
        <div>
            <Map id={params.business} />
        </div>
    )
}