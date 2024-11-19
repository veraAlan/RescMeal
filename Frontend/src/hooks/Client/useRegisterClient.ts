import { useContext, useState } from 'react'
import { Client, ClientErrors } from '../../types/Client'
import { User } from '@/types/UserRegister'
import axiosConfig from '@/utils/axiosConfig'
import { redirect } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

export const useRegisterClient = () => {
    const [userErrors, setUserErrors] = useState<User>({})
    const [clientErrors, setClientErrors] = useState<ClientErrors>({})
    const [status, setStatus] = useState(0)
    const [successMessage, setSuccessMessage] = useState('')
    const [generalError, setGeneralError] = useState('')
    const [userSession, setUserSession] = useState<Boolean | null>(null)

    const [clientForm, setClientForm] = useState<Client>({
        name: '',
        last_name: '',
        phone: '',
        address: '',
        birthdate: ''
    })

    const [userForm, setRegisterForm] = useState<User>({
        username: '',
        email: '',
        role: 'client',
        password: ''
    })

    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setRegisterForm({
            ...userForm,
            [name]: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setClientForm({
            ...clientForm,
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
            axiosConfig.post('/api/client', clientForm)
                .then(r => {
                    const authContext = useContext(AuthContext)
                    if (!authContext) return null
                    const { login } = authContext
                    login(r.data.token)
                    setStatus(r.status)
                    setSuccessMessage('Cliente registrado exitosamente')
                })
                .catch(e => {
                    for (const key in e.response.data) {
                        if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                            tempErrors[key] = e.response.data[key]
                        }
                    }
                    setClientErrors(tempErrors)
                    setGeneralError('Error registrando cliente. Por favor, inténtelo de nuevo.')
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
        clientForm,
        clientErrors,
        successMessage,
        generalError,
        handleChange,
        handleChangeRegister,
        handleSubmit
    }
}