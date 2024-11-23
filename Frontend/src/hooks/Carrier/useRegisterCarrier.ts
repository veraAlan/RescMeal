import { useContext, useState } from 'react'
import { Carrier, CarrierErrors } from '../../types/Carrier'
import { User } from '@/types/UserRegister'
import axiosConfig from '@/utils/axiosConfig'
import { redirect } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

export const useRegisterCarrier = () => {
    const [carrierErrors, setCarrierErrors] = useState<CarrierErrors>({})
    const [userErrors, setUserErrors] = useState<User>({})
    const [hasCarrier, setHasCarrier] = useState<Boolean | null>(null)
    const [status, setStatus] = useState(0)
    const [userSession, setUserSession] = useState<Boolean | null>(null)
    const [linkUser, setLinkUser] = useState({ id: 0 })
    const authContext = useContext(AuthContext)

    const [carrierForm, setCarrierForm] = useState<Carrier>({
        name: '',
        lastName: '',
        vehicleType: '',
        phone: '',
        birthdate: ''
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

        axiosConfig.post(`/api/auth/valid`, userForm)
            .then(() => { setUserErrors({}) })
            .catch(e => {
                for (const key in e.response.data) {
                    if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                        tempErrors[key] = e.response.data[key];
                    }
                }
                setUserErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0;
    }

    const validateCarrier = (carrierForm: Carrier) => {
        let tempErrors: { [k: string]: any } = {}

        axiosConfig.post(`/api/carrier/valid`, carrierForm)
            .then((r) => {
                console.log("Validate: ", r)
                setCarrierErrors({})
            })
            .catch(e => {
                console.log("Errors: ", e)
                for (const key in e.response.data) {
                    if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                        tempErrors[key] = e.response.data[key]
                    }
                }
                setCarrierErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateUser(userForm) && !userSession) {
            await axiosConfig.post(`/api/auth/signup`, userForm)
                .then(r => {
                    if (authContext) {
                        const { login } = authContext
                        setLinkUser(r.data.id)
                        login(r.data.token)
                    }
                    setUserSession(true)
                })
                .catch(e => {
                    let tempErrors: { [k: string]: any } = {}
                    for (const key in e.response.data) {
                        if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                            tempErrors[key] = e.response.data[key]
                        }
                    }
                    setUserErrors(tempErrors)
                })
        }

        if (validateCarrier(carrierForm) && userSession) {
            const formData = new FormData()
            formData.append("carrier", new Blob([JSON.stringify(carrierForm)], { type: 'application/json' }))
            formData.append("user", new Blob([JSON.stringify(linkUser)], { type: 'application/json' }))
            axiosConfig.post('/api/carrier', formData)
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
                    setCarrierErrors(tempErrors)
                })
        }
    }

    if (status === 200 || status === 201) {
        setTimeout(redirect("/"), 1000)
        redirect("/")
    }


    return {
        userForm,
        userErrors,
        userSession,
        carrierForm,
        carrierErrors,
        handleChange,
        handleChangeRegister,
        handleSubmit
    }
}