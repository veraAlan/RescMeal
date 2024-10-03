import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link href="/" className="hover:underline">Inicio</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/register/client" className="hover:underline">Registrar Cliente</Link>
                        </li>
                        <li>
                            <Link href="/register/carrier" className="hover:underline">Registrar Repartidor</Link>
                        </li>
                        <li>
                            <Link href="/register/business" className="hover:underline">Registrar Local</Link>
                        </li>
                        <li>
                            <Link href="/register/food" className="hover:underline">Registrar Platillo</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;