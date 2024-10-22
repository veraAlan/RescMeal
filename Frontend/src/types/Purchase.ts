import { Food } from './Food';

export interface Client {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
}

export interface Business {
    id: number;
    name: string;
    type: string;
    address: string;
    image: string;
    email: string;
    phone: string;
}

export interface PurchasedItem {
    food: Food | { id: number };
    quantity: number;
    price: number;
}

export interface Purchase {
    id: number;
    client: Client;
    business: Business;
    payment_method: string;
    total_cost: number;
    pickup: boolean;
    creation_date: string;
    purchasedItems: PurchasedItem[];
}

export interface PurchaseErrors {
    payment_method?: string;
    pickup?: string;
    [key: string]: string | undefined;
}