import { Business } from './Business';
import { Food } from './Food';
import { Purchase } from './Purchase';

export interface PurchasedItem {
    id?: number;
    purchase: Purchase;
    business: Business;
    food: Food;
    quantity: number;
    price: number;
}