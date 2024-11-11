import { Food } from './Food';

export interface PurchasedItem {
    food: Food | { id: number };
    quantity: number;
    price: number;
}