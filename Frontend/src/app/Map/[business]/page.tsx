'use client'
import React from 'react';
import Map from '@/components/Map/Map';
import useBusinessById from '@/hooks/Business/useBusiness';

//TODO esta deberia ser una pagina que visualice un bussines especifico junto al mapa
// Aca pueden probar el mapa, revisar el tiempo de carga porque hay veces que el servidor se muere
export default function Page({ params }: { params: { business: number } }) {
    const { business } = useBusinessById({ businessId: params.business })
    if (!business) { return <div>Error No se encuentra ningun Local</div> }
    console.log(business)
    return (
        <div>
            <div>
            <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Local </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{business.name}</h4>
            <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Celular: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{business.phone}</h4>
            <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Horario: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{business.schedule}</h4>
            </div>
            <div>
                <Map id={params.business} />
            </div>
        </div>
    )
}