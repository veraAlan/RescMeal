import { useState, useEffect } from "react";
import axiosConfig from "@/utils/axiosConfig";
import { User } from "@/types/UserRegister";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export const useUpdateUser = () => {
    const [userErrors, setUserErrors] = useState<User>({})
    const [status, setStatus] = useState(0)
    const [userSession, setUserSession] = useState<Boolean | null>(null)
    const [linkUser, setLinkUser] = useState({ id: 0 })

    useEffect(() => {
        function fetchUser() {
            if (linkUser.id == 0) {
                axiosConfig.get(`/api/auth/me`)
                    .then(r => {
                        setLinkUser(r.data.id)
                        setUserForm(r.data)
                        setUserSession(true)
                        toast.success('Datos cargados! Modifique lo que necesite.')
                    })
                    .catch(e => toast.error(e))
            }
        }

        fetchUser()
    }, []);

    const [userForm, setUserForm] = useState<User>({
        username: '',
        email: '',
        password: ''
    })

    const handleChangeUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUserForm({
            ...userForm,
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateUser(userForm) && userSession) {
            const formUserData = new FormData()
            formUserData.append("user", new Blob([JSON.stringify(linkUser)], { type: 'application/json' }))
            axiosConfig.put(`/api/auth/update`, formUserData)
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
                    setUserErrors(tempErrors)
                })
        }
    }

    if (status === 200) {
        toast.success('Actualizacion correcta, redireccionando...')
        setTimeout(redirect("/auth/me"), 3000)
    }

    return {
        userForm,
        userErrors,
        userSession,
        handleChangeUpdate,
        handleSubmit
    }
}
