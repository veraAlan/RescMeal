"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/Cart/useCart';

const Cart: React.FC = () => {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">No hay artículos en el carrito.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.food.id} className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2">
                            <div>
                                <p className="font-bold">{item.food.name}</p>
                                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Precio por unidad: ${item.food.price}</p>
                                <p className="text-sm text-gray-500">Subtotal: ${item.food.price * item.quantity}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button onClick={() => item.food.id && decrementQuantity(item.food.id)} className="bg-gray-300 px-2 py-1 rounded">-</button>
                                    <button onClick={() => item.food.id && incrementQuantity(item.food.id)} className="bg-gray-300 px-2 py-1 rounded">+</button>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.food)} className="text-red-500 hover:underline">Eliminar</button>
                        </div>
                    ))}
                    <div className="mt-4 flex justify-between">
                        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Vaciar Carrito</button>
                        <Link href="/checkout">
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Realizar Compra</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;