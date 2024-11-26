import { clientDelivery } from "@/hooks/Client/useClientDelivery";


export default () => {
    const {deliveryClient} = clientDelivery();
}