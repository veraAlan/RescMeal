import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import axiosConfig from '@/utils/axiosConfig'
import { toast } from 'react-toastify'

export interface Business {
   name?: string
   type?: string
   address?: string
   address_lat?: number
   address_long?: number
   phone?: string
   schedule?: string
   cvu?: string
}

export interface linkUser {
   id?: number
}

export const useUpdateBusiness = () => {
   const [imageError, setImageError] = useState<string | null>(null)
   const [address, setAddress] = useState<string>('Neuquén Capital')
   const [address_lat, setAddressLat] = useState<number>(-38.9517)
   const [address_long, setAddressLong] = useState<number>(-68.0591)
   const [userSession, setUserSession] = useState<Boolean | null>(null)
   const [imageForm, setImageData] = useState<File | null>(null)
   const [businessErrors, setBusinessErrors] = useState<Business>({})
   const [status, setStatus] = useState(0)
   const [linkUser, setLinkUser] = useState<linkUser>({ id: 0 })

   useEffect(() => {
      async function fetchBusiness() {
         if (linkUser.id == 0) {
            await axiosConfig.get(`/api/auth/me`)
               .then(r => {
                  setLinkUser(r.data.id)
                  setBusinessData(r.data.business)
                  setAddressLat(r.data.business.address_lat)
                  setAddressLong(r.data.business.address_long)
                  setImageData(null)
                  setUserSession(true)
                  toast.success('Datos cargados! Modifique lo que necesite.')
               })
               .catch(e => toast.error(e))
         }
      }

      fetchBusiness()
   }, []);

   const [businessForm, setBusinessData] = useState<Business>({
      name: '',
      type: '',
      address: '',
      address_lat: 0,
      address_long: 0,
      phone: '',
      schedule: '',
      cvu: ''
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setBusinessData({
         ...businessForm,
         [name]: value
      })
   }

   const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const file = e.target.files[0]
         if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImageData(file)
         } else {
            setImageError('Solo se permiten imágenes JPEG o PNG')
         }
      }
   }

   const validateBusiness = (businessForm: Business): boolean => {
      let tempErrors: { [k: string]: any } = {}

      axiosConfig.post(`/api/business/valid`, businessForm, { withCredentials: true })
         .then(() => { setBusinessErrors({}) })
         .catch(error => {
            for (const key in error.response.data) {
               if (Object.prototype.hasOwnProperty.call(error.response.data, key)) {
                  tempErrors[key] = error.response.data[key]
               }
            }
            setBusinessErrors(tempErrors)
         })

      return Object.keys(tempErrors).length === 0
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (validateBusiness(businessForm) && userSession) {
         const businessData = new FormData()
         businessForm.address = address
         businessForm.address_lat = address_lat
         businessForm.address_long = address_long
         businessData.append("business", new Blob([JSON.stringify(businessForm)], { type: 'application/json' }))
         if (imageForm != null) businessData.append("image", imageForm)
         await axiosConfig.put(`/api/business`,
            businessData, {
            headers: {
               'Content-Type': 'multipart/mixed'
            }
         }).then(r => {
            setStatus(r.status)
         }).catch(e => {
            toast.error(e)
         })
      }
   }

   if (status === 200 || status === 201) {
      setTimeout(redirect("/auth/me"), 5000)
   }

   return {
      businessForm,
      imageForm,
      businessErrors,
      imageError,
      userSession,
      setAddress,
      setAddressLat,
      setAddressLong,
      handleChange,
      handleImage,
      handleSubmit
   }
}