import useClientDelivery from "../Client/useClientDelivery";
import { useListCarrierComments } from "../comment/useCarrierComments";


export function useUserInfo() {
    const { deliveryCarrier } = useClientDelivery();
    if (deliveryCarrier?.id) {
        const { commentCarriers, error, loading } = useListCarrierComments(deliveryCarrier?.id)
    }
}