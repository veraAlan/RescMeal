"use client";
import React, { useState } from 'react';
import { useCart } from '../../hooks/Cart/useCart';

const CheckoutPage: React.FC = () => {
    const { cart, processPurchase } = useCart();
    const [client, setClient] = useState({ id: 1 });
    const [business, setBusiness] = useState({ id: 1 });
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [pickup, setPickup] = useState(true);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!paymentMethod) {
            alert('Por favor, ingresa un método de pago.');
            return;
        }

        const payload = {
            client,
            business,
            payment_method: paymentMethod,
            total_cost: cart.reduce((total, item) => total + item.food.price * item.quantity, 0),
            pickup,
            creation_date: new Date().toISOString().split('T')[0],
            purchasedItems: cart.map(item => ({
                food: { id: item.food.id },
                quantity: item.quantity,
                price: item.food.price
            }))
        };

        console.log("Payload:", payload);
        await processPurchase(payload);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Finalizar Compra</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Método de Pago:</label>
                    <input 
                        type="text" 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label>Pickup:</label>
                    <input 
                        type="checkbox" 
                        checked={pickup} 
                        onChange={(e) => setPickup(e.target.checked)} 
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mt-4 flex justify-center">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Confirmar Compra</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;