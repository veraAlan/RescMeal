"use client";
import Link from 'next/link';
import Logo from './Logo';
import CartIcon from '../Cart/CartIcon';

const Header: React.FC = () => {
    return (

        <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Logo />
                </div>
                <div className="flex space-x-4">
                    <Link href="/auth/login" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Iniciar Sesión</Link>
                    <Link href="/auth/register/client" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Cliente</Link>
                    <Link href="/auth/register/business" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Local</Link>
                    <Link href="/auth/register/carrier" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Repartidor</Link>
                    <Link href="auth/auth/register/food" className="bg-green-500 text-white font-bold py-2 px-4 rounded">Registrar Comida</Link>
                    <Link href="/delivery" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">Pedidos Pendientes</Link>
                    <Link href="/delivery/takenOrders" className="bg-orange-500 text-white font-bold py-2 px-4 rounded">Pedidos Tomados</Link>
                    <Link href={`/Direction`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Mapa</Link>
                    <Link href="/business/dashboard" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Dashboard de Ventas</Link>
                    <CartIcon />
                </div>
            </div>
            </header>
    );
};

export default Header;