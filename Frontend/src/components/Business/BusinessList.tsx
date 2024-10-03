import React from 'react';
import { useListBusinesses } from '../../hooks/useListBusinesses';
import { Business } from '../../types/Business';

interface BusinessListProps {
    businesses?: Business[];
}

const BusinessList: React.FC<BusinessListProps> = () => {
    const { businesses, loading, error } = useListBusinesses();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading businesses: {error}</div>;
    }

    if (!businesses || businesses.length === 0) {
        return <div className="text-center text-gray-500">No businesses available</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Negocios</h2>
            <ul className="space-y-2">
                {businesses.map(({ id, name, type, phone, email, image }) => (
                    <li key={id} className="border p-2 rounded shadow-sm">
                        <p><strong>Nombre:</strong> {name}</p>
                        <p><strong>Tipo:</strong> {type}</p>
                        <p><strong>Teléfono:</strong> {phone || 'N/A'}</p>
                        <p><strong>Correo Electrónico:</strong> {email}</p>
                        {image && (
                            <img
                                src={image}
                                alt={`${name} logo.`}
                                className="mt-2"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessList;