'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosConfig from '../../utils/axiosConfig';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import { FaCreditCard, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { HiOutlineChip } from 'react-icons/hi';

const BalanceButton: React.FC = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [successModalIsOpen, setSuccessModalIsOpen] = useState(false); // Nuevo estado
    const [amount, setAmount] = useState<number>(0);
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [cardTitle, setCardTitle] = useState<string>('');
    const [showBack, setShowBack] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        Modal.setAppElement('#balance-button-modal');
        // Simulate fetching user info and balance
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

    const getOwnInformation = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error fetching own information', error);
            throw error;
        }
    };


    const addBalance = async (amount: number) => {
        try {
            const userInfo = await getOwnInformation();
            const id = userInfo.client.id;
            const response = await axiosConfig.post(`/api/client/${id}/add`, null, {
                params: { id, amount }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to add balance', error);
            throw error;
        }
    };

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalIsOpen(false);
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!amount || amount <= 0) newErrors.amount = 'Este campo es obligatorio';
        if (!cardNumber) newErrors.cardNumber = 'Este campo es obligatorio';
        if (!expiryDate) newErrors.expiryDate = 'Este campo es obligatorio';
        if (!cvv) newErrors.cvv = 'Este campo es obligatorio';
        if (!cardTitle) newErrors.cardTitle = 'Este campo es obligatorio';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            await addBalance(amount);
            setMessage('Fondos agregados con éxito');
            setBalance((prevBalance) => (prevBalance !== null ? prevBalance + amount : amount));
            setAmount(0);
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            setCardTitle('');
            setShowBack(false);
            setErrors({});
            setModalIsOpen(false);
            setSuccessModalIsOpen(true);
        } catch (error) {
            console.error('Failed to add balance', error);
            setMessage('Error al agregar fondos');
        }
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length === 2 && !value.includes('/')) {
            setExpiryDate(value + '/');
        } else if (value.length <= 5) {
            setExpiryDate(value);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (value > 0) {
            setAmount(value);
        } else {
            setAmount(0);
        }
    };

    return (
        <div id="balance-button-modal">
            <button
                className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={handleOpenModal}
            >
                ${balance !== null ? balance.toFixed(2) : '0.00'}
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add Funds Modal"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Agregar Fondos</h2>
                    <div className="relative mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-gradient-to-r from-blue-500 to-blue-300" style={{ width: '300px', height: '180px' }}>
                        <CSSTransition in={!showBack} timeout={500} classNames="flip" unmountOnExit>
                            <div className="front text-white">
                                <div className="flex justify-between items-center">
                                    <HiOutlineChip className="text-2xl" />
                                    <FaCcVisa className="text-2xl" />
                                    <FaCcMastercard className="text-2xl" />
                                </div>
                                <p className="text-2xl mt-4">{cardNumber.padEnd(16, '#').replace(/(.{4})/g, '$1 ')}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <p className="text-lg">Fecha de Expiración:</p>
                                        <p className="text-2xl">{expiryDate.padEnd(5, 'MM/AA')}</p>
                                    </div>
                                    <FaCreditCard className="text-2xl" />
                                </div>
                            </div>
                        </CSSTransition>
                        <CSSTransition in={showBack} timeout={500} classNames="flip" unmountOnExit>
                            <div className="back text-white">
                                <div className="relative">
                                    <div className="flex justify-end items-center mt-4 px-4 text-lg">
                                        <p>Firma:</p>
                                        <div className="bg-white h-8 w-40 ml-2 flex items-center pl-2">
                                            <p>{cvv.padEnd(3, '#')}</p>
                                        </div>
                                    </div>
                                    <p className="absolute top-16 right-4 text-2xl">{cvv.padEnd(3, '#')}</p>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Cantidad</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(event) => {
                                    const input = event.target.value;
                                    // Verifica que el valor sea un número y que no exceda los 6 dígitos
                                    if (/^\d{0,6}$/.test(input)) {
                                        setAmount(Number(input)); // Convertir a número
                                    }
                                }}
                                min="1"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCardNumber(value);
                                }}
                                maxLength={16}
                                placeholder="#### #### #### ####"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                inputMode="numeric"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
                            <input
                                type="text"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                maxLength={5}
                                placeholder="MM/AA"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCvv(value);
                                    setShowBack(true);
                                }}
                                maxLength={3}
                                onBlur={() => setShowBack(false)}
                                placeholder="###"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                inputMode="numeric"
                            />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cardTitle" className="block text-sm font-medium text-gray-700">Título de la Tarjeta</label>
                            <input
                                type="text"
                                id="cardTitle"
                                value={cardTitle}
                                onChange={(e) => setCardTitle(e.target.value)}
                                maxLength={50}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.cardTitle && <p className="text-red-500 text-xs mt-1">{errors.cardTitle}</p>}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full">Agregar Fondos</button>
                    </form>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                    <button onClick={handleCloseModal} className="mt-4 text-red-500">Cerrar</button>
                </div>
            </Modal>
            <Modal
                isOpen={successModalIsOpen}
                onRequestClose={handleCloseSuccessModal}
                contentLabel="Success Modal"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">¡Éxito!</h2>
                    <p className="mb-4">Fondos agregados con éxito.</p>
                    <button onClick={handleCloseSuccessModal} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full">Cerrar</button>
                </div>
            </Modal>
            <style jsx>{`
                .flip-enter {
                    transform: rotateY(180deg);
                }
                .flip-enter-active {
                    transform: rotateY(0deg);
                    transition: transform 500ms;
                }
                .flip-exit {
                    transform: rotateY(0deg);
                }
                .flip-exit-active {
                    transform: rotateY(180deg);
                    transition: transform 500ms;
                }
            `}</style>
        </div>
    );
}

export default BalanceButton;    