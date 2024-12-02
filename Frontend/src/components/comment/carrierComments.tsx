import React from 'react';
import { useListCarrierComments } from "@/hooks/comment/useCarrierComments";



const CarrierComments = ({ id }: { id: number }) => {

    const { commentCarriers, error, loading } = useListCarrierComments({ carrierId: id })
    console.log(commentCarriers)
    if (commentCarriers)
        return (
            <div>
                <div>
                    {commentCarriers == null ? (
                        <p className="text-center text-gray-500 p-4">No existen comentarios de este repartidor.</p>
                    ) : (
                        <div className="flex flex-col items-center w-full max-w-4xl p-4">
                            {commentCarriers.map((comment) => (
                                <div className='w-full gap-2 flex flex-cols-2 p-4'>
                                    <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Cliente: </h3>
                                    <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{comment.client.name}</h4>
                                    <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Comentario: </h3>
                                    <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{comment.description}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
}

export default CarrierComments;