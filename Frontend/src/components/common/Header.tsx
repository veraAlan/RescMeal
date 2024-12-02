'use client'
import Link from 'next/link'
import Logo from './Logo'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import CartIcon from '../Cart/CartIcon'
import BalanceButton from '../Balance/BalanceButton'

const Header: React.FC = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) return null

    const { isLoggedIn, logout, sessionRole } = authContext

    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        window.location.href = '/'
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className={`fixed top-0 w-full z-10 p-4 shadow-lg transition-colors duration-300 ${isScrolled ? 'bg-opacity-80 bg-blue-500 text-white' : 'bg-blue-500 text-white'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <Logo />
                <div className="lg:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {isMenuOpen ? <AiOutlineClose className="text-white text-2xl" /> : <AiOutlineMenu className="text-white text-2xl" />}
                    </button>
                </div>
                <div className={`transition-all duration-300 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:space-x-4`}>
                    {isLoggedIn && sessionRole === 'CLIENT' ? (
                        <>
                            <CartIcon />
                            <BalanceButton />
                            <Link href="/auth/me" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Perfil</Link>
                            <Link href="/delivery/client" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Pedido</Link>
                            <Link href="/comment" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Comentar Última Compra</Link>
                            <button onClick={handleLogout} className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Cerrar Sesión</button>
                        </>
                    ) : isLoggedIn && sessionRole === 'BUSINESS' ? (
                        <>
                            <Link href="/auth/register/food" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Registrar Comida</Link>
                            <Link href="/dashboard" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Estadística</Link>
                            <Link href="/auth/me" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Perfil</Link>
                            <button onClick={handleLogout} className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Cerrar Sesión</button>
                        </>
                    ) : isLoggedIn && sessionRole === 'CARRIER' ? (
                        <>
                            <Link href="/delivery" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Pedidos Pendientes</Link>
                            <Link href="/delivery/takenOrders" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Pedidos Tomados</Link>
                            <Link href="/auth/me" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Perfil</Link>
                            <button onClick={handleLogout} className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Cerrar Sesión</button>
                        </>
                    ) : (
                        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
                            <Link href="/auth/register/client" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Registrar Cliente</Link>
                            <Link href="/auth/register/business" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Registrar Local</Link>
                            <Link href="/auth/register/carrier" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Registrar Repartidor</Link>
                            <Link href="/auth/login" className="w-full lg:w-auto text-center bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300">Iniciar Sesión</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header