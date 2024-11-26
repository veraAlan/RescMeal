import { useEffect, useState } from 'react'
import { FoodErrors } from '../../../types/Food'
import axiosConfig from '@/utils/axiosConfig'
import { toast } from 'react-toastify'
import normlizeDate from '@/utils/normalizeDate'

export const useModifyFoods = (foodId: string | null) => {
   const [imageData, setImageData] = useState<File | null>(null)
   const [errors, setErrors] = useState<FoodErrors>({})
   const [successMessage, setSuccessMessage] = useState('')
   const [successImage, setSuccessImage] = useState('')
   const [generalError, setGeneralError] = useState('')

   const [formData, setFormData] = useState<any>({
      name: null,
      category: null,
      price: null,
      image: null,
      description: null,
      quantity: null,
      expiration_date: null,
      production_date: null
   })

   useEffect(() => {
      axiosConfig.get('/api/food/' + foodId)
         .then(r => {
            r.data.image = '/Food/' + r.data.image
            r.data.expiration_date = r.data.expiration_date.slice(0, 10)
            r.data.production_date = r.data.production_date.slice(0, 10)
            setFormData(r.data)
            toast.success('Se cargo la comida')
         })
         .catch(e => { toast.error('Error cargando la comida: ', e) })
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const file = e.target.files[0]
         if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImageData(file)
            setSuccessImage("Se actualizo la imagen.")
         } else {
            setErrors({ ...errors, image: 'Solo se permiten imágenes JPEG o PNG' })
         }
      }
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

   }

   return {
      formData,
      errors,
      successImage,
      generalError,
      handleChange,
      handleImage,
      handleSubmit
   }
}