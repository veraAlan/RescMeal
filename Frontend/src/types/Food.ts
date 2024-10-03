import { Business } from './Business';

export interface Food {
    id?: number;
    business: Business;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
    expiration_date: string;
    production_date: string;
}