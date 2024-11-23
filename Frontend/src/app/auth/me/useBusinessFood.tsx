import { Business } from '@/types/Business'
import axiosConfig from '@/utils/axiosConfig'
import { useEffect, useState } from 'react'

interface FoodItem {
   id: number
   business: Business
   name: string
   category: string
   price: number
   image: string
   description?: string
   quantity: number
   expiration_date: string
   production_date: string
}

interface FoodPage extends Array<FoodItem> { }

function normlizeDate(date: String) {
   return date.slice(0, 10).split('-').reverse().join('-')
}

export function useBusinessFoods() {
   const [page, setPage] = useState<number>()
   const [size, setSize] = useState<number>()
   const [businessFoods, setBusinessFoods] = useState<FoodPage | null>()
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      axiosConfig.get(`/api/food/me`,
         {
            params: { page, size }
         })
         .then(response => {
            for (const food of response.data._embedded.foodList) {
               food.image = '/Food/' + food.image
               food.expiration_date = normlizeDate(food.expiration_date)
               food.production_date = normlizeDate(food.production_date)
            }
            setBusinessFoods(response.data._embedded.foodList)
         })
         .catch(err => {
            console.error('Error fetching data:', err)
            if (err instanceof Error) {
               setError(err.message)
            } else {
               setError('An unknown error occurred')
            }
         })
   }, [page])

   return { businessFoods, error }
}

export default useBusinessFoods