import { useContext, useState } from 'react';
import axios from 'axios';
import { User } from '../../types/User';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

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
      setLoginData({
         ...loginData,
         [name]: value
      })
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
         identifier: loginData.identifier,
         password: loginData.password
      }, { withCredentials: true })
         .then(response => {
            if (!authContext) {
               return null;
            }
            const { login } = authContext

            login(response.data.token)
            setStatus(response.status)
            setError(null)
         })
         .catch(error => setError("Email, nombre de usuario o contraseña incorrecta."))
   }

   if (status == 200) {
      redirect("/")
   }

   return {
      loginData,
      error,
      handleChange,
      handleSubmit
   };
};