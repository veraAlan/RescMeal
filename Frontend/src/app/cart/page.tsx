"use client";
import React from 'react';
import Link from 'next/link';
import Cart from '../../components/Cart/Cart';

const CartPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Tu Carrito</h1>
            <Cart />
            <div className="mt-4 flex justify-center">
                <Link href="/">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded">Volver para seguir comprando</button>
                </Link>
            </div>
        </div>
    );
};

export default CartPage;
