import { useState } from 'react';
import { getSessionId } from '../../utils/getSessionId';
import { getEmailById } from '../../utils/getEmailById';
import { PurchasedItem, PurchaseErrors } from '../../types/Purchase';
import { useCart } from '../../hooks/Cart/useCart';
import axiosConfig from '../../utils/axiosConfig';

export const usePurchase = () => {
    const { cart, clearCart } = useCart();
    const [errors, setErrors] = useState<PurchaseErrors>({});
    
    const handleMercadoPago = async (
        paymentMethod: string,
        pickup: string,
        address: string,
        address_lat: number,
        address_long: number
    ) => {
        try {
            const client_id = await getSessionId();
            const email = await getEmailById(client_id);
    
            const purchasedItems: PurchasedItem[] = cart.map(item => {
                if (item.food.id === undefined || item.food.business.id === undefined) {
                    throw new Error("El id del alimento o negocio no puede ser undefined");
                }
                return {
                    food: { id: item.food.id },
                    business: { id: item.food.business.id },
                    quantity: item.quantity,
                    price: item.food.price
                };
            });
    
            const payload: any = {
                client: { id: client_id },
                total_cost: cart.reduce((total, item) => total + item.food.price * item.quantity, 0),
                creation_date: new Date().toISOString().split('T')[0],
                address,
                address_lat,
                address_long,
                purchasedItems
            };
    
            if (paymentMethod !== '') {
                payload.payment_method = paymentMethod;
            }
    
            if (pickup !== '') {
                payload.pickup = pickup === "true";
            }

            const { data: preferenceUrl } = await axiosConfig.post(`/api/purchase/process-payment`, payload, {
                params: { email },
            });            
    
            if (preferenceUrl) {
                window.location.href = preferenceUrl;
                clearCart();
            }
        } catch (error) {
            console.error("Error procesando el pago:", error);
            setErrors({ global: "Error en el procesamiento del pago" });
        }
    };

    return { handleMercadoPago, errors };
};
