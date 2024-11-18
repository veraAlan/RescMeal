import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { useContext } from "react"
import CartIcon from "../Cart/CartIcon"

const RoleHeader: React.FC = () => {
   const authContext = useContext(AuthContext)
   if (!authContext) return null

   const { sessionRole } = authContext

   switch (sessionRole) {
      case "BUSINESS": return (<>
         <Link href="auth/auth/register/food" className="bg-green-500 text-white font-bold py-2 px-4 rounded">Registrar Comida</Link>
         <Link href="/delivery/takenOrders" className="bg-orange-500 text-white font-bold py-2 px-4 rounded">Pedidos Tomados</Link>
         <Link href={`/Direction`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Mapa</Link>
         <Link href="/dashboard" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Estadisticas de Venta</Link>
      </>);
      case "CARRIER": return (<>
         <Link href="/delivery" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">Pedidos Pendientes</Link>
         <Link href="/delivery/takenOrders" className="bg-orange-500 text-white font-bold py-2 px-4 rounded">Pedidos Tomados</Link>
         <Link href={`/Direction`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Mapa</Link>
      </>);
      case "CLIENT": return (<>
         <Link href={`/Direction`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Mapa</Link>
         <CartIcon />
      </>);
      case "ADMIN": return (<>
         <Link href={`/Direction`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Mapa</Link>
      </>);
      default: return (<>
         <Link href="/auth/register/client" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Cliente</Link>
         <Link href="/auth/register/business" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Local</Link>
         <Link href="/auth/register/carrier" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Registrar Repartidor</Link>
         <Link href="/auth/login" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Iniciar Sesión</Link>
      </>);
   }
}

export default RoleHeader