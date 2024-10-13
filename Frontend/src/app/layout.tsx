import './globals.css';
import React, { ReactNode } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="es">
            <head>
                <title>RescMeal</title>
            </head>
            <body className="flex flex-col min-h-screen bg-background text-foreground">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default Layout;