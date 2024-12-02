import normalizePhone from '@/utils/normalizePhone'
import Role from './profile'
import normalizeDate from '@/utils/normalizeDate'

export interface Role {
   name?: string
   type?: string
   address?: string
   schedule?: string
   cvu?: string
   last_name?: string
   balance?: number
   phone?: string
   birthdate?: string
}

export default (props: { profile: Role | null }) => {
   let phone, birthdate
   if (props.profile?.phone) phone = normalizePhone(props.profile.phone)
   if (props.profile?.birthdate) birthdate = normalizeDate(props.profile.birthdate)

   return (
      <div className="container mx-auto mt-16 mb-8 p-4 sm:p-8 bg-white text-black shadow-xl rounded-lg max-w-screen-lg">
         <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 text-lg border rounded-xl border-gray-300">
            <div className="w-full flex flex-col items-start">
               <h3 className="font-semibold text-xl text-gray-700 mb-2">Información del Cliente</h3>
               <div className="w-full mb-2">
                  <strong>Nombre: </strong>
                  <span className="text-gray-900">{props.profile?.name}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Apellido: </strong>
                  <span className="text-gray-900">{props.profile?.last_name}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Celular: </strong>
                  <span className="text-gray-900">{phone}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Balance: </strong>
                  <span className="text-gray-900">AR$ {props.profile?.balance}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Fecha de Nacimiento: </strong>
                  <span className="text-gray-900">{birthdate}</span>
               </div>
               <div className="flex justify-center w-full mt-4">
                  <a href="/auth/me/client">
                     <button className="border border-gray-300 rounded-lg px-6 py-2 font-bold bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Modificar Datos</button>
                  </a>
               </div>
            </div>
         </div>
      </div>
   )
}