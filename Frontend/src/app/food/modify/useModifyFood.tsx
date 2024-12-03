import { useEffect, useState } from 'react'
import { Food, FoodErrors } from '../../../types/Food'
import axiosConfig from '@/utils/axiosConfig'
import { toast } from 'react-toastify'
import normlizeDate from '@/utils/normalizeDate'
import { redirect } from 'next/navigation'

export const useModifyFoods = (foodId: string | null) => {
   const [imageData, setImageData] = useState<File | null>(null)
   const [foodErrors, setFoodErrors] = useState<FoodErrors>({})
   const [status, setStatus] = useState(0)
   const [userSession, setUserSession] = useState<Boolean | null>(null)
   const [foodForm, setFoodData] = useState<Food>({
      name: '',
      category: '',
      price: 0,
      image: '',
      description: '',
      quantity: 0,
      expiration_date: '',
      production_date: '',
   })

   useEffect(() => {
      async function fetchFood() {
         await axiosConfig.get(`/api/food/` + foodId)
            .then(r => {
               r.data.expiration_date = r.data.expiration_date.slice(0, 10)
               r.data.production_date = r.data.production_date.slice(0, 10)
               setFoodData(r.data)
               setUserSession(true)
               toast.success("Datos de la comida Cargados! Modifique lo que necesite")
            })
            .catch(e => toast.error(e))
      }

      fetchFood()
   }, [])

   // // const [formData, setFormData] = useState<any>({
   // //    name: null,
   // //    category: null,
   // //    price: null,
   // //    image: null,
   // //    description: null,
   // //    quantity: null,
   // //    expiration_date: null,
   // //    production_date: null
   // // })

   // useEffect(() => {
   //    axiosConfig.get('/api/food/' + foodId)
   //       .then(r => {
   //          r.data.image = '/Food/' + r.data.image
   //          r.data.expiration_date = r.data.expiration_date.slice(0, 10)
   //          r.data.production_date = r.data.production_date.slice(0, 10)
   //          setFormData(r.data)
   //          setUserSession(true)
   //          toast.success('Se cargo la comida')
   //       })
   //       .catch(e => { toast.error('Error cargando la comida: ', e) })
   // }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFoodData({
         ...foodForm,
         [name]: value
      })
   }

   const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const file = e.target.files[0]
         if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImageData(file)
         } else {
            setFoodErrors({ ...Error, image: 'Solo se permiten imágenes JPEG o PNG' })
         }
      }
   }

   const validateFood = (foodForm: Food) => {
      let tempErrors: { [k: string]: any } = {}
      axiosConfig.post(`/api/food/valid`, foodForm)
         .then(() => { setFoodErrors({}) })
         .catch(e => {
            for (const key in e.response.data) {
               if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                  tempErrors[key] = e.response.data[key]
               }
            }
            setFoodErrors(tempErrors)
         })
      return Object.keys(tempErrors).length === 0
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (validateFood(foodForm) && userSession) {
         const formData = new FormData()
         formData.append("food", new Blob([JSON.stringify(foodForm)], { type: 'application/json' }))

         if (imageData != null) formData.append("image", imageData)
         await axiosConfig.put('/api/food',
            formData, {
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
      foodForm,
      foodErrors,
      handleChange,
      handleImage,
      handleSubmit
   }
}