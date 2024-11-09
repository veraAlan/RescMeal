"use client";
import React, { useState } from 'react';
import { useCart } from '../../hooks/Cart/useCart';
import { Purchase, PurchasedItem, PurchaseErrors } from '../../types/Purchase';
import { useRouter } from 'next/navigation';
import SuccessModal from '../../components/Cart/SuccessModal';
import axios from 'axios';

const CheckoutPage: React.FC = () => {
    const { cart, processPurchase, clearCart } = useCart(); // Asegúrate de incluir clearCart aquí
    const [client, setClient] = useState({ id: 1 });
    const [business, setBusiness] = useState({ id: 1 });
    const [user, setUser] = useState({ id: 1, email: 'comprador-unico@example.com' }); // Usa un email único para el comprador
    const [paymentMethod, setPaymentMethod] = useState('');
    const [pickup, setPickup] = useState('');
    const [errors, setErrors] = useState<PurchaseErrors>({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const purchasedItems: PurchasedItem[] = cart.map(item => {
            if (item.food.id === undefined) {
                throw new Error("El id del alimento no puede ser undefined");
            }
            return {
                food: { id: item.food.id },
                quantity: item.quantity,
                price: item.food.price
            };
        });

        const payload: any = {
            client,
            business,
            user, // Incluir el user en el payload
            total_cost: cart.reduce((total, item) => total + item.food.price * item.quantity, 0),
            creation_date: new Date().toISOString().split('T')[0],
            purchasedItems
        };

        if (paymentMethod !== '') {
            payload.payment_method = paymentMethod;
        }

        if (pickup !== '') {
            payload.pickup = pickup === "true";
        }

        const result = await processPurchase(payload);

        if (result.success) {
            setShowSuccessModal(true);
            setTimeout(() => {
                router.push('/');
            }, 2000); 
        } else {
            setErrors(result.errors || {});
        }
    };

    const handleMercadoPago = async () => {
        const purchasedItems: PurchasedItem[] = cart.map(item => {
            if (item.food.id === undefined) {
                throw new Error("El id del alimento no puede ser undefined");
            }
            return {
                food: { id: item.food.id },
                quantity: item.quantity,
                price: item.food.price
            };
        });

        const payload: any = {
            client,
            business,
            user, // Incluir el user en el payload
            total_cost: cart.reduce((total, item) => total + item.food.price * item.quantity, 0),
            creation_date: new Date().toISOString().split('T')[0],
            purchasedItems
        };

        if (paymentMethod !== '') {
            payload.payment_method = paymentMethod;
        }

        if (pickup !== '') {
            payload.pickup = pickup === "true";
        }

        const token = localStorage.getItem("token");

        try {
            const { data: preferenceUrl } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/purchase/process-payment`, payload, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (preferenceUrl) {
                window.location.href = preferenceUrl;
                clearCart();
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            setErrors({ global: "Error en el procesamiento del pago" });
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Finalizar Compra</h1>
            <form onSubmit={handleSubmit}>
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
                    {errors.payment_method && <p className="text-red-500">{errors.payment_method}</p>}
                </div>
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
                    {errors.pickup && <p className="text-red-500">{errors.pickup}</p>}
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Confirmar Compra</button>
                    <button type="button" onClick={handleMercadoPago} className="bg-blue-500 text-white px-4 py-2 rounded">Confirmar Compra con Mercado Pago</button>
                </div>
            </form>

            <SuccessModal show={showSuccessModal} />
        </div>
    );
};

export default CheckoutPage;