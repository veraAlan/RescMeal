import { Food } from './Food';

export interface PurchasedItem {
    food: Food;
    quantity: number;
    price: number;
}