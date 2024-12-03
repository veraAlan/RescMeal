// import { Carrier } from "@/types/Carrier"
// import { Purchase } from "@/types/Purchase"
// import axiosConfig from "@/utils/axiosConfig"
// import normalizeDate from "@/utils/normalizeDate"
// import { useEffect, useState } from "react"
// import { toast } from "react-toastify"

// export interface Profile {
//     id: number
//     username?: string
//     email?: string
//     role?: string
//     password?: string
//     business?: Object
//     client?: Object
//     carrier?: Object
// }

// export default function clientDelivery() {
//     const [deliveryCarrier, setDeliveryCarrier] = useState<Carrier | null>(null)
//     const [state, setState] = useState<String | null>(null)
//     const [purchase, setPurchase] = useState<Purchase>()

//     useEffect(() => {
//         async function fetchDelivery() {
//             await axiosConfig.get(`/api/auth/me`)
//                 .then(r => {
//                     axiosConfig.get(`/api/purchase/last/` + r.data.client.id)
//                         .then(p => {
//                             p.data.creation_date = normalizeDate(p.data.creation_date)
//                             setPurchase(p.data)
//                             axiosConfig.get(`/api/delivery/carrierByPurchase/` + p.data.id)
//                                 .then(d => {
//                                     setState("En Camino")
//                                     setDeliveryCarrier(d.data)
//                                 })
//                                 .catch(() => { toast.error('Error al conseguir los datos del pedido') })
//                         })
//                         .catch(() => { toast.error('Error al conseguir los datos de compra') })
//                 })
//                 .catch(() => { toast.error('Error al conseguir los datos') })
//         }
//         fetchDelivery()
//     }, [])

//     return { deliveryCarrier, purchase, state }
// }