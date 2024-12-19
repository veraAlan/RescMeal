import { FoodPage } from '@/types/Food'
import axiosConfig from '@/utils/axiosConfig'
import normlizeDate from '@/utils/normalizeDate'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export function useBusinessFoods() {
   const [page, setPage] = useState<number>()
   const [size, setSize] = useState<number>(50)
   const [businessFoods, setBusinessFoods] = useState<FoodPage | null>()

   useEffect(() => {
      axiosConfig.get(`/api/food/me`, { params: { page, size } })
         .then(response => {
            for (const food of response.data._embedded.foodList) {
               food.image = '/Food/' + food.image
               food.expiration_date = normlizeDate(food.expiration_date)
               food.production_date = normlizeDate(food.production_date)
            }
            setBusinessFoods(response.data._embedded.foodList)
         })
         .catch(() => { toast.error("No se pudieron cargar tus publicaciones.") })
   }, [page])

   return { businessFoods }
}

export default useBusinessFoods