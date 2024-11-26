import { useEffect, useState } from 'react'
import { Client, ClientErrors } from '../../types/Client'
import axiosConfig from '@/utils/axiosConfig'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

export const useModifyClient = () => {
   const [clientErrors, setClientErrors] = useState<ClientErrors>({})
   const [status, setStatus] = useState(0)
   const [userSession, setUserSession] = useState<Boolean | null>(null)
   const [linkUser, setLinkUser] = useState({ id: 0 })

   useEffect(() => {
      function fetchClient() {
         if (linkUser.id == 0) {
            axiosConfig.get(`/api/auth/me`)
               .then(r => {
                  r.data.client.birthdate = r.data.client.birthdate.slice(0, 10)
                  setLinkUser(r.data.id)
                  setClientForm(r.data.client)
                  setUserSession(true)
                  toast.success('Datos cargados! Modifique lo que necesite.')
               })
               .catch(e => toast.error(e))
         }
      }

      fetchClient()
   }, []);

   const [clientForm, setClientForm] = useState<Client>({
      name: '',
      last_name: '',
      phone: '',
      birthdate: ''
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setClientForm({
         ...clientForm,
         [name]: value
      })
   }

   const validateClient = (clientForm: Client) => {
      let tempErrors: { [k: string]: any } = {}

      axiosConfig.post(`/api/client/valid`, clientForm)
         .then(() => { setClientErrors({}) })
         .catch(e => {
            for (const key in e.response.data) {
               if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                  tempErrors[key] = e.response.data[key]
               }
            }
            setClientErrors(tempErrors)
         })

      return Object.keys(tempErrors).length === 0
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (validateClient(clientForm) && userSession) {
         const formData = new FormData()
         formData.append("client", new Blob([JSON.stringify(clientForm)], { type: 'application/json' }))
         formData.append("user", new Blob([JSON.stringify(linkUser)], { type: 'application/json' }))
         axiosConfig.put('/api/client', formData)
            .then(r => {
               setStatus(r.status)
            })
            .catch(e => {
               let tempErrors: { [k: string]: any } = {}
               for (const key in e.response.data) {
                  if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                     tempErrors[key] = e.response.data[key]
                  }
               }
               setClientErrors(tempErrors)
            })
      }
   }

   if (status === 200) {
      toast.success('Actualizacion correcta, redireccionando...')
      setTimeout(redirect("/auth/me"), 3000)
   }

   return {
      userSession,
      clientForm,
      clientErrors,
      handleChange,
      handleSubmit
   }
}