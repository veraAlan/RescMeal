import { Client } from './Client';
// import { PurchasedItem } from './PurchasedItem';
import { Business } from './Business';
import { Food } from './Food';


export interface Purchase {
    id: number;
    client: Client;
    payment_method: string;
    total_cost: number;
    pickup: boolean;
    creation_date: string;
    address: string;
    address_lat: number;
    address_long: number;
    purchasedItems: PurchasedItem;
}
export interface PurchasedItem {
    id?: number;
    purchase: Purchase;
    business: Business;
    food: Food;
    quantity: number;
    price: number;
}

export interface PurchaseErrors {
    payment_method?: string;
    pickup?: string;
    [key: string]: string | undefined;
}