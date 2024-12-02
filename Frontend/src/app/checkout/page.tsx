"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePurchase } from '../../hooks/Purchase/usePurchase';
import PaymentMethod from '../../components/Purchase/PaymentMethod';
import PickupMethod from '../../components/Purchase/PickupMethod';
import AddressPicker from '../../components/Map/AddressPicker';

const CheckoutPage: React.FC = () => {
    const { handleMercadoPago, errors } = usePurchase();
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [pickup, setPickup] = useState<string>('');

    const [address, setAddress] = useState<string>('Neuquén Capital');
    const [addressLat, setAddressLat] = useState<number>(-38.9517);
    const [addressLong, setAddressLong] = useState<number>(-68.0591);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Finalizar Compra</h1>
            <form className="bg-white p-6 shadow rounded-lg max-w-xl mx-auto">
                <PaymentMethod
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    error={errors.payment_method}
                />
                <PickupMethod
                    pickup={pickup}
                    setPickup={setPickup}
                    error={errors.pickup}
                />
                <AddressPicker
                    setAddress={setAddress}
                    setAddressLat={setAddressLat}
                    setAddressLong={setAddressLong}
                />
                <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button type="button" onClick={() => handleMercadoPago(paymentMethod, pickup, address, addressLat, addressLong)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mx-auto block">Mercado Pago</button>
                </div>
            </form>
            <div className="mt-4 flex justify-center">
                <Link href="/">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">Volver</button>
                </Link>
            </div>
        </div>
    );
};

export default CheckoutPage;