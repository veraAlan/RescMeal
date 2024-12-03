"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePurchase } from '../../hooks/Purchase/usePurchase';
import PaymentMethod from '../../components/Purchase/PaymentMethod';
import PickupMethod from '../../components/Purchase/PickupMethod';
import AddressPicker from '../../components/Map/AddressPicker';
import { useRouter } from 'next/navigation';

const CheckoutPage: React.FC = () => {
    const router = useRouter();
    const { handleMercadoPago, handleMiDinero, errors } = usePurchase();
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [pickup, setPickup] = useState<string>('');

    const [address, setAddress] = useState<string>('Neuquén Capital');
    const [addressLat, setAddressLat] = useState<number>(-38.9517);
    const [addressLong, setAddressLong] = useState<number>(-68.0591);

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleSuccess = () => {
        setIsSuccess(true);
        setTimeout(() => {
            router.push('/food');
        }, 5000);
    };

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
                {errors.global && <p className="text-red-500 text-center mt-4">{errors.global}</p>}
                <div className="mt-4 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button type="button" onClick={() => handleMercadoPago(paymentMethod, pickup, address, addressLat, addressLong, handleSuccess)} className="bg-blue-500 text-white px-4 py-2 w-full sm:w-auto rounded hover:bg-blue-600 transition duration-200">Mercado Pago</button>
                    <button type="button" onClick={() => handleMiDinero(paymentMethod, pickup, address, addressLat, addressLong, handleSuccess)} className="bg-green-500 text-white px-4 py-2 w-full sm:w-auto rounded hover:bg-green-600 transition duration-200">Pagar con Mi Dinero</button>
                </div>
            </form>
            <div className="mt-4 flex justify-center">
                <Link href="/food">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">Volver</button>
                </Link>
            </div>
            {isSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-3xl font-bold mb-4 text-green-600">¡Compra Exitosa!</h2>
                        <p className="text-lg mb-4">Tu compra se ha realizado con éxito.</p>
                        <p className="text-lg">Serás redirigido en 5 segundos...</p>
                        <div className="flex justify-center mt-4">
                            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;