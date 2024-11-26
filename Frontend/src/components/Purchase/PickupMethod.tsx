import React from 'react';

interface Props {
    pickup: string;
    setPickup: (method: string) => void;
    error: string | undefined;
}

const PickupMethod: React.FC<Props> = ({ pickup, setPickup, error }) => (
    <div>
        <label>Método de Entrega:</label>
        <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="border p-2 rounded w-full"
        >
            <option value="">Seleccionar Entrega o Retiro</option>
            <option value="false">Retiro en el negocio</option>
            <option value="true">Entrega a domicilio</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
    </div>
);

export default PickupMethod;