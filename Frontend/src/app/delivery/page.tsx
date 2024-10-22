"use client";
import React from 'react';
import Link from 'next/link';
import ListDelivery from '../../components/Delivery/ListDelivery';

const Page: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Pedidos</h1>
            <ListDelivery />
            <div className="mt-4 flex justify-center">
                <Link href="/">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded">Volver a la página principal</button>
                </Link>
            </div>
        </div>
    );
};

export default Page;