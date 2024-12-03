import React from 'react';

interface Props {
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    error: string | undefined;
}

const PaymentMethod: React.FC<Props> = ({ paymentMethod, setPaymentMethod, error }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Método de Pago:</label>
        <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        >
            <option value="">Seleccionar un método de pago</option>
            <option value="credit_card">Tarjeta de crédito</option>
            <option value="debit_card">Tarjeta de débito</option>
        </select>
        {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
);

export default PaymentMethod;