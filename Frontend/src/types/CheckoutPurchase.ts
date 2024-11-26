export interface CheckoutPurchasedItem {
    food: { id: number }; 
    quantity: number;
    price: number;
}

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

export interface CheckoutPurchase {
    client: Client;
    business: Business;
    payment_method?: string;
    total_cost: number;
    pickup?: boolean;
    creation_date: string;
    purchasedItems: CheckoutPurchasedItem[];
}

// Define la interfaz PurchaseErrors
export interface PurchaseErrors {
    payment_method?: string;
    pickup?: string;
    [key: string]: string | undefined;
}