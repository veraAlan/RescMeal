'use client'
import Link from 'next/link'
import Logo from './Logo'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import RoleHeader from './Role'

const Header: React.FC = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) return null

    const { isLoggedIn, logout } = authContext

    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Logo />
                </div>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link href="/auth/me" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Perfil</Link>
                            <Link href="/auth/login">
                                <button onClick={logout} className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Cerrar Sesion</button>
                            </Link>
                            <RoleHeader />
                        </>
                    ) : (
                        <>
                            <Link href="/auth/register/client" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Cliente</Link>
                            <Link href="/auth/register/business" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Local</Link>
                            <Link href="/auth/register/carrier" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Repartidor</Link>
                            <Link href="/auth/login" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Iniciar Sesión</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header