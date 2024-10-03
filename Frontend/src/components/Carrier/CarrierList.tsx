import React from 'react';
import { useListCarriers } from '../../hooks/useListCarriers';
import { Carrier } from '../../types/Carrier';

interface CarrierListProps {
    carriers?: Carrier[];
}

const CarrierList: React.FC<CarrierListProps> = () => {
    const { carriers, loading, error } = useListCarriers();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading carriers: {error}</div>;
    }

    if (!carriers || carriers.length === 0) {
        return <div className="text-center text-gray-500">No carriers available</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Listar Repartidores</h2>
            <ul className="space-y-2">
                {carriers.map(({ id, name, lastName, email, vehicleType, phone, date }) => (
                    <li key={id} className="border p-2 rounded shadow-sm">
                        <p><strong>Nombre:</strong> {name}</p>
                        <p><strong>Apellido:</strong> {lastName}</p>
                        <p><strong>Correo Electrónico:</strong> {email}</p>
                        <p><strong>Tipo de Vehículo:</strong> {vehicleType || 'N/A'}</p>
                        <p><strong>Teléfono:</strong> {phone || 'N/A'}</p>
                        <p><strong>Fecha:</strong> {date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarrierList;