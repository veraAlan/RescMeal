'use client';

import { useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link';

const BalanceButton: React.FC = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);

    const getOwnInformation = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error fetching own information', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getOwnInformation();
                setUserInfo(data);
                setBalance(data.client?.balance ?? 0.00);
            } catch (error) {
                console.error('Failed to fetch user info', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <Link href="/add">
            <button
                className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300"
            >
                ${balance !== null ? balance.toFixed(2) : '0.00'}
            </button>
        </Link>
    );
}

export default BalanceButton;