import { Food } from './Food';

export interface PurchasedItem {
    food: { id: number };
    quantity: number;
    price: number;
}

export interface Purchase {
    client: { id: number };
    business: { id: number };
    payment_method: string;
    total_cost: number;
    pickup: boolean;
    creation_date: string;
    purchasedItems: PurchasedItem[];
}

export interface PurchaseErrors {
    client?: string;
    business?: string;
    payment_method?: string;
    total_cost?: string;
    pickup?: string;
    creation_date?: string;
    purchasedItems?: PurchasedItemErrors[];
}

export interface PurchasedItemErrors {
    food?: string;
    quantity?: string;
    price?: string;
}