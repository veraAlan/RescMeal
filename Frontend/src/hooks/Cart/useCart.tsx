"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Food } from '../../types/Food';

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
    processPurchase: (payload: any) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (food: Food) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.food.id === food.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { food, quantity: 1 }];
        });
    };

    const incrementQuantity = (foodId: number) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.food.id === foodId ? { ...item, quantity: item.quantity + 1 } : item
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

const processPurchase = async (payload: any) => {
    console.log("Enviando payload:", payload); // Verifica el payload aquí
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Error al procesar la compra');
        }

        console.log("Compra procesada:", payload);
        clearCart();
    } catch (error) {
        console.error(error);
    }
}

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