import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl"><Link to="/">Inicio</Link></h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/register-client" className="hover:underline">Registrar Cliente</Link></li>
                        <li><Link to="/register-carrier" className="hover:underline">Registrar Repartidor</Link></li>
                        <li><Link to="/register-business" className="hover:underline">Registrar Local</Link></li>
                        <li><Link to="/register-food" className="hover:underline">Registrar Platillo</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

