import ClientProfile from "@/app/auth/me/ClientProfile"
import { Delivery } from "@/types/Delivery"
import { Purchase } from "@/types/Purchase"
import axiosConfig from "@/utils/axiosConfig"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export interface Profile {
    id: number
    username?: string
    email?: string
    role?: string
    password?: string
    business?: Object
    client?: Object
    carrier?: Object
}

export function clientDelivery() {
    const [dataClient, setDataClient] = useState<Profile | null>(null)
    const [deliveryClient, setDeliveryClient] = useState<Delivery | null>(null)
    const [clientPurchase, setClientPurchase] = useState<Purchase | null>(null)
    useEffect(() => {
        async function fetchProfile() {
            await axiosConfig.get(`/api/auth/me`)
                .then(r => { setDataClient(r.data.client) })
                .catch(() => { toast.error('Error al conseguir los datos') })
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        async function fetchPurchase() {
            await axiosConfig.get(`/api/purchase/last/` + dataClient?.id)
                .then(p => { setClientPurchase(p.data) })
                .catch(() => { toast.error('Error al conseguir los datos de compra') })
        }
        fetchPurchase()
    })

    useEffect(() => {
        async function fetchDelivery(){
            axiosConfig.get(`/api/delivery/carrierByPurchase/` + clientPurchase?.id)
            .then(d => {setDeliveryClient(d.data)})
            .catch(() => { toast.error('Error al conseguir los datos del pedido')})
        }
        fetchDelivery()
    })

    return{ deliveryClient }
}