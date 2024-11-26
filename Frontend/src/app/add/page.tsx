'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RechargeCardProps {
    balance: number;
    clientId: number;
}

const RechargeCard: React.FC<RechargeCardProps> = ({ balance, clientId }) => {

    const handleAddFunds = async (clientId: number, amount: number) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/add`, null, {
                params: { amount },
                withCredentials: true
            });
            toast.success('¡Fondos agregados exitosamente!');
            console.log('Balance actualizado:', response.data);
        } catch (error) {
            toast.error('Error al agregar fondos');
            console.error('Error al agregar fondos:', error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Recarga tu cuenta</h1>
                <div className="mb-6">
                    <h2 className="text-xl text-gray-800">Saldo disponible</h2>
                    {balance !== undefined ? (
                        <p className="text-green-500 text-3xl font-bold">${balance.toFixed(2)}</p>
                    ) : (
                        <p className="text-red-500 text-xl font-bold">Saldo no disponible</p>
                    )}
                </div>
                <button
                    onClick={() => handleAddFunds(clientId, balance)}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Agregar Fondos
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

const AddPage: React.FC = () => {
    const [balances, setBalances] = useState<number[]>([100, 200, 300]);
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-row space-x-6">
                {userInfo && balances.map((balance) => (
                    <RechargeCard key={balance} balance={balance} clientId={userInfo.client.id} />
                ))}
            </div>
        </div>
    );
};

export default AddPage;