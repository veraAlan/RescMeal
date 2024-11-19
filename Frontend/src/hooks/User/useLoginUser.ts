import { useContext, useState } from 'react'
import { User } from '../../types/UserLogin'
import { redirect } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'
import axiosConfig from '../../utils/axiosConfig'

export const useLoginUser = () => {
   const [status, setStatus] = useState<Number | null>(null)
   const [error, setError] = useState<String | null>(null)
   const authContext = useContext(AuthContext)

   const [loginData, setLoginData] = useState<User>({
      identifier: '',
      password: ''
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setLoginData({ ...loginData, [name]: value })
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      {
         axiosConfig.post('/api/auth/signin', {
            identifier: loginData.identifier,
            password: loginData.password
         })
            .then(r => {
               if (!authContext) return null
               const { login } = authContext

               login(r.data.token)
               setStatus(r.status)
               setError(null)
            })
            .catch(e => setError("Email, nombre de usuario o contraseña incorrecta."))
      }
   }

   if (status == 200) {
      redirect("/")
   }

   return {
      loginData,
      error,
      handleChange,
      handleSubmit
   }
}