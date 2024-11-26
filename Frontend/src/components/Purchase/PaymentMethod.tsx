import React from 'react';

interface Props {
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    error: string | undefined;
}

const PaymentMethod: React.FC<Props> = ({ paymentMethod, setPaymentMethod, error }) => (
    <div>
        <label>Método de Pago:</label>
        <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 rounded w-full"
        >
            <option value="">Seleccionar un método de pago</option>
            <option value="credit_card">Tarjeta de crédito</option>
            <option value="debit_card">Tarjeta de débito</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
    </div>
);

export default PaymentMethod;