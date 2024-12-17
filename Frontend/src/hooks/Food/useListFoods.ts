import { useState, useEffect, useRef } from 'react'
import { FoodPage } from '../../types/Food'
import axiosConfig from '@/utils/axiosConfig'
import { toast } from 'react-toastify'
import normalize from '@/utils/normalizeDate'

export function useListFoods() {
    const [foods, setFoods] = useState<FoodPage>([])

    useEffect(() => {
        async function fetchFoods() {
            await axiosConfig.get(`/api/food/list`, { params: { page: 0, size: 100 } })
                .then(response => {
                    for (const food of response.data._embedded.foodList) {
                        food.image = '/Food/' + food.image
                        food.expiration_date = normalize(food.expiration_date)
                        food.production_date = normalize(food.production_date)
                    }
                    setFoods(response.data._embedded.foodList)
                })
                .catch(() => { toast.error("No se pudo cargar las comidas. Intente en otro momento.") })
        }
        fetchFoods()
    }, [])

    return { foods }
}

export default useListFoods