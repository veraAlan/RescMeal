import React from 'react';
import { Purchase } from '../../types/Purchase';
import MapCoordinates from '../Map/MapCoordinates';

const ListDelivery = ({ purchases, handleTakeOrder }: { purchases: Purchase[], handleTakeOrder: (purchaseId: number) => void }) => {
    const formatCreationDate = (dateString: string) => {
        const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchases.map(purchase => (
                <div key={purchase.id} className="bg-white p-4 rounded shadow-md flex flex-col md:flex-row md:col-span-2">
                    <div className="flex-1 md:pr-4">
                        <p><strong>Cliente:</strong> {purchase.client.name}</p>
                        <p><strong>Total:</strong> ${purchase.total_cost}</p>
                        <p><strong>Fecha de Creación:</strong> {formatCreationDate(purchase.creation_date)}</p>
                        <p><strong>Dirección:</strong> {purchase.address}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={() => handleTakeOrder(purchase.id)}
                        >
                            Tomar Pedido
                        </button>
                    </div>
                    <div className="w-full h-64 md:w-1/2">
                        <MapCoordinates lat={purchase.address_lat} lng={purchase.address_long} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListDelivery;