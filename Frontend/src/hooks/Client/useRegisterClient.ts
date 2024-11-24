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
    const [userSession, setUserSession] = useState<Boolean | null>(null)
    const [linkUser, setLinkUser] = useState({ id: 0 })
    const authContext = useContext(AuthContext)

    const [clientForm, setClientForm] = useState<Client>({
        name: '',
        last_name: '',
        phone: '',
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
        let tempErrors: { [k: string]: any } = {}

        axiosConfig.post(`/api/auth/valid`, userForm)
            .then(() => { setUserErrors({}) })
            .catch(e => {
                for (const key in e.response.data) {
                    if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                        tempErrors[key] = e.response.data[key]
                    }
                }
                setUserErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0
    }

    const validateClient = (clientForm: Client) => {
        let tempErrors: { [k: string]: any } = {}

        axiosConfig.post(`/api/client/valid`, clientForm)
            .then(() => { setClientErrors({}) })
            .catch(e => {
                for (const key in e.response.data) {
                    if (Object.prototype.hasOwnProperty.call(e.response.data, key)) {
                        tempErrors[key] = e.response.data[key]
                    }
                }
                setClientErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateUser(userForm) && !userSession) {
            console.log("Sent userForm: ", userForm)
            axiosConfig.post(`/api/auth/signup`, userForm)
                .then(r => {
                    if (!authContext) return null
                    const { login } = authContext
                    login(r.data.token)
                    setLinkUser(r.data.id)
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

        if (validateClient(clientForm) && userSession) {
            const formData = new FormData()
            formData.append("client", new Blob([JSON.stringify(clientForm)], { type: 'application/json' }))
            formData.append("user", new Blob([JSON.stringify(linkUser)], { type: 'application/json' }))
            axiosConfig.post('/api/client', formData)
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
                    setClientErrors(tempErrors)
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
        handleChange,
        handleChangeRegister,
        handleSubmit
    }
}