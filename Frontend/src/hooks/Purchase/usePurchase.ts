import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionId } from '../../utils/getSessionId';
import { getEmailById } from '../../utils/getEmailById';
import axios from 'axios';
import { PurchasedItem, PurchaseErrors } from '../../types/Purchase';
import { useCart } from '../../hooks/Cart/useCart';

export const usePurchase = () => {
    const { cart, processPurchase, clearCart } = useCart();
    const [errors, setErrors] = useState<PurchaseErrors>({});
    const router = useRouter();

    const handleSubmit = async (
        event: React.FormEvent,
        paymentMethod: string,
        pickup: string,
        setShowSuccessModal: (show: boolean) => void
    ) => {
        event.preventDefault();

        try {
            const client_id = await getSessionId();
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
                client: { id: client_id },
                business: { id: cart[0].food.business.id },
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
        } catch (error) {
            console.error("Error procesando la compra:", error);
            setErrors({ global: "Error procesando la compra" });
        }
    };

    const handleMercadoPago = async (
        paymentMethod: string,
        pickup: string
    ) => {
        try {
            const client_id = await getSessionId();
            const email = await getEmailById(client_id);
    
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
                client: { id: client_id },
                business: { id: cart[0].food.business.id },
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

            const { data: preferenceUrl } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/purchase/process-payment`, payload, {
                params: { email },
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

    return { handleSubmit, handleMercadoPago, errors };
};