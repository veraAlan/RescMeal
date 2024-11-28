'use client';
import React from 'react';
import { useCart } from '../../hooks/Cart/useCart';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

const CartIcon: React.FC = () => {
    const { cart } = useCart();
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Link href="/cart">
            <button className="flex justify-center items-center w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">
                <FaShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                    <span className="ml-2">{itemCount}</span>
                )}
            </button>
        </Link>
    );
};

export default CartIcon;