import { useState, useEffect } from 'react'
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
                    const availableFoods = response.data._embedded.foodList.filter(food => food.quantity > 0)
                    for (const food of availableFoods) {
                        food.image = '/Food/' + food.image
                        food.expiration_date = normalize(food.expiration_date)
                        food.production_date = normalize(food.production_date)
                    }
                    setFoods(availableFoods)
                })
                .catch(() => { toast.error("No se pudo cargar las comidas. Intente en otro momento.") })
        }
        fetchFoods()
    }, [])

    return { foods }
}

export default useListFoods