import { useState, useEffect } from "react";
import { Carrier, CarrierErrors } from "../../types/Carrier";
import axiosConfig from "@/utils/axiosConfig";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";


export const useUpdateCarrier = () => {
    const [carrierErrors, setCarriertErrors] = useState<CarrierErrors>({})
    const [status, setStatus] = useState(0)
    const [userSession, setUserSession] = useState<Boolean | null>(null)
    const [linkUser, setLinkUser] = useState({ id: 0 })

    useEffect(() => {
        function fetchCarrier() {
            if (linkUser.id == 0) {
                axiosConfig.get(`/api/auth/me`)
                    .then(r => {
                        r.data.carrier.birthdate = r.data.carrier.birthdate.slice(0, 10)
                        setLinkUser(r.data.id)
                        setCarrierForm(r.data.carrier)
                        setUserSession(true)
                        toast.success('Datos cargados! Modifique lo que necesite.')
                    })
                    .catch(e => toast.error(e))
            }
        }

        fetchCarrier()
    }, []);

    const [carrierForm, setCarrierForm] = useState<Carrier>({
        name: '',
        last_name: '',
        vehicle_type: '',
        phone: '',
        birthdate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCarrierForm({
            ...carrierForm,
            [name]: value
        });
    };

    const validateCarrier = (carrierForm: Carrier) => {
        let tempErrors: { [k: string]: any } = {}
        axiosConfig.post(`/api/carrier/valid`, carrierForm)
            .then(() => { setCarriertErrors({}) })
            .catch(e => {
                for (const key in e.response.data) {
                    if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                        tempErrors[key] = e.response.data[key]
                    }
                }
                setCarriertErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateCarrier(carrierForm) && userSession) {
            const formData = new FormData()
            formData.append("carrier", new Blob([JSON.stringify(carrierForm)], { type: 'application/json' }))
            formData.append("user", new Blob([JSON.stringify(linkUser)], { type: 'application/json' }))
            axiosConfig.put('/api/carrier', formData)
                .then(r => {
                    setStatus(r.status)
                })
                .catch(e => {
                    let tempErrors: { [k: string]: any } = {}
                    for (const key in e.response.data) {
                        if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                            tempErrors[key] = e.response.data[key]
                        }
                    }
                    setCarriertErrors(tempErrors)
                })
        }
    }
    
    if (status === 200) {
        toast.success('Actualizacion correcta, redireccionando...')
        setTimeout(redirect("/auth/me"), 3000)
    }

    return {
        userSession,
        carrierForm,
        carrierErrors,
        handleChange,
        handleSubmit
    }
}