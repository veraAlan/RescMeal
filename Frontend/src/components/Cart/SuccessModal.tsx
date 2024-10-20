"use client";
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface SuccessModalProps {
    show: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show }) => {
    return (
        <>
            {show && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300">
                        <div className="flex items-center justify-center mb-4">
                            <AiOutlineCheckCircle className="text-green-500 text-4xl" />
                            <h2 className="text-2xl font-bold ml-2">Compra exitosa!</h2>
                        </div>
                        <p className="text-right text-sm">Serás redirigido a la página principal en unos segundos.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default SuccessModal;