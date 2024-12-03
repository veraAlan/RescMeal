import { Business } from './Business';

export interface FoodPage extends Array<Food> { }

export interface Food {
    id: number;
    business: Business;
    name: string;
    category: string;
    price: number;
    image: string;
    description?: string;
    quantity: number;
    expiration_date: string;
    production_date: string;
}

export interface FoodErrors {
    name?: string;
    category?: string;
    price?: string;
    image?: string;
    description?: string;
    quantity?: string;
    expiration_date?: string;
    production_date?: string;
}