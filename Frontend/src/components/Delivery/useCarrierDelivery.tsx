import { Delivery } from '@/types/Delivery'
import axiosConfig from '@/utils/axiosConfig'
import { useEffect, useState } from 'react'

interface DeliveryPage extends Array<Delivery> { }

export function useCarrierDelivery() {
    const [page, setPage] = useState<number>()
    const [size, setSize] = useState<number>()
    const [carrierDeliverys, setCarrierDeliverys] = useState<DeliveryPage | null>()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axiosConfig.get("/api/delivery/me", { params: { page, size } })
            .then(response => {
                setCarrierDeliverys(response.data._embedded.deliveryList)
            })
            .catch(err => {
                console.error('Error fetching data:', err)
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('An unknown error occurred')
                }
            })
    } , [page])
console.log(carrierDeliverys)
    return { carrierDeliverys, error}
}
