import { useState } from 'react'
import { Carrier, CarrierErrors } from '../../types/Carrier'
import { User } from '@/types/UserRegister'
import axiosConfig from '@/utils/axiosConfig'
import { redirect } from 'next/navigation'

export const useRegisterCarrier = () => {
    const [carrierErrors, setCarrierErrors] = useState<CarrierErrors>({})
    const [userErrors, setUserErrors] = useState<User>({})
    const [successMessage, setSuccessMessage] = useState('')
    const [generalError, setGeneralError] = useState('')
    const [status, setStatus] = useState(0)
    const [userSession, setUserSession] = useState<Boolean | null>(null)
    const [hasCarrier, setHasCarrier] = useState<Boolean | null>(null)

    const [carrierForm, setCarrierForm] = useState<Carrier>({
        name: '',
        lastName: '',
        vehicleType: '',
        phone: '',
        date: ''
    })

    const [userForm, setRegisterData] = useState<User>({
        username: '',
        email: '',
        role: 'carrier',
        password: ''
    })

    if (userSession == null) {
        axiosConfig.get(`/api/auth/validate`)
            .then(r => { setUserSession(true) })
            .catch(e => { setUserSession(false) })
    }

    if (hasCarrier == null) {
        axiosConfig.get(`/api/auth/session-id`)
            .then(r => { if (r.status == 200) setHasCarrier(true) })
            .catch(e => { setHasCarrier(false) })
    }

    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setRegisterData({
            ...userForm,
            [name]: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setCarrierForm({
            ...carrierForm,
            [name]: value
        })
    }

    const validateUser = (userForm: User) => {
        let tempErrors: { [k: string]: any } = {};

        axiosConfig.post(`/api/auth/valid`, userForm, { withCredentials: true })
            .then(() => { setUserErrors({}) })
            .catch(e => {
                console.log("Error: ", e)
                for (const key in e.response.data) {
                    if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                        tempErrors[key] = e.response.data[key];
                    }
                }
                setUserErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateUser(userForm) && !userSession) {
            console.log("Sent userForm: ", userForm)
            await axiosConfig.post(`/api/auth/signup`, userForm, { withCredentials: true })
                .then(r => {
                    setUserSession(true)
                })
                .catch(e => {
                    console.log("Error creating user: ", e)
                    setGeneralError(e.response.data)
                })
        }

        if (userSession) {
            let tempErrors: { [k: string]: any } = {}
            axiosConfig.post('/api/carrier', carrierForm)
                .then(r => {
                    console.log('Carrier registrado exitosamente')
                    setSuccessMessage('Carrier registrado exitosamente')
                    setStatus(r.status)
                })
                .catch(e => {
                    for (const key in e.response.data) {
                        if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                            tempErrors[key] = e.response.data[key]
                        }
                    }
                    setCarrierErrors(tempErrors)
                })
        }

        if (status === 200 || status === 201) {
            setTimeout(redirect("/"), 1000)
            redirect("/")
        }
    }

    return {
        userForm,
        userErrors,
        userSession,
        hasCarrier,
        carrierForm,
        carrierErrors,
        successMessage,
        generalError,
        handleChange,
        handleChangeRegister,
        handleSubmit
    }
}