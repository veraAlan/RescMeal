"use client";

import useClientDelivery from "@/hooks/Client/useClientDelivery";
import CarrierComments from "@/components/comment/carrierComments";


export default function useUserInfo() {
    const { deliveryCarrier } = useClientDelivery();

    if (deliveryCarrier) {
        const id = deliveryCarrier.id;
        if (id){
            return (
                <div>
                    <div>
                        <h2 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Repartidor</h2>
                        <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Nombre </h3>
                        <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{deliveryCarrier.name} {deliveryCarrier?.last_name}</h4>
                        <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Vehiculo: </h3>
                        <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{deliveryCarrier.vehicle_type}</h4>
                        <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Celular: </h3>
                        <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{deliveryCarrier.phone}</h4>
                    </div>
                    <div>
                        <CarrierComments id={id} />
                    </div>
                </div>
            )
        }
        }
}