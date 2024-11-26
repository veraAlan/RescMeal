import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 mt-8 shadow-inner">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 Mi Negocio. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;