import { Purchase } from './Purchase';
import { Carrier } from './Carrier';

export interface Delivery {
    id: number;
    purchase: Purchase;
    carrier: Carrier;
    address: string;
    delivery_time: string;
    arrival_time: string;
    waiting_time: string;
    delivery_state: string;
    tip: number;
}