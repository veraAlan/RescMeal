"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Food } from '../../types/Food';
import { Purchase } from '../../types/Purchase';
import axiosInstance from '../../utils/axiosConfig';

interface CartItem {
    food: Food;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (food: Food) => void;
    incrementQuantity: (foodId: number) => void;
    decrementQuantity: (foodId: number) => void;
    removeFromCart: (food: Food) => void;
    clearCart: () => void;
    processPurchase: (payload: Purchase) => Promise<{ success: boolean; errors?: { [key: string]: string } }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (food: Food) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.food.id === food.id);
            if (existingItem) {
                if (existingItem.quantity < food.quantity) {
                    return prevCart.map(item =>
                        item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
                    return prevCart;
                }
            }
            return [...prevCart, { food, quantity: 1 }];
        });
    };

    const incrementQuantity = (foodId: number) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.food.id === foodId && item.quantity < item.food.quantity ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (foodId: number) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.food.id === foodId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeFromCart = (food: Food) => {
        setCart((prevCart) =>
            prevCart.filter(item => item.food.id !== food.id)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const processPurchase = async (payload: Purchase): Promise<{ success: boolean; errors?: { [key: string]: string } }> => {
        console.log("Enviando payload:", payload);
        try {
            const response = await axiosInstance.post('/purchase', payload);

            if (response.status !== 200) {
                return { success: false, errors: response.data.errors };
            }

            console.log("Compra procesada:", payload);
            clearCart();
            return { success: true };
        } catch (error) {
            console.error("Error en el procesamiento de la compra:", error);
            return { success: false, errors: { global: "Error en el procesamiento de la compra" } };
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, processPurchase }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
