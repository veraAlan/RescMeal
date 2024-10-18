"use client";
import React from 'react';
import { useCart } from '../../hooks/Cart/useCart';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

const CartIcon: React.FC = () => {
    const { cart } = useCart();
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Link href="/cart">
            <button className="relative flex items-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
                <FaShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </button>
        </Link>
    );
};

export default CartIcon;