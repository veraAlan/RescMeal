import { useState, useEffect, useContext } from "react";
import axiosConfig from "@/utils/axiosConfig";
import { UserUpdate } from "@/types/UserRegister";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export const useUpdateUser = () => {
    const [userErrors, setUserErrors] = useState<UserUpdate>({})
    const [status, setStatus] = useState(0)
    const [userSession, setUserSession] = useState<Boolean | null>(null)
    const [linkUser, setLinkUser] = useState({ id: 0 })
    const authContext = useContext(AuthContext)

    useEffect(() => {
        function fetchUser() {
            if (linkUser.id == 0) {
                axiosConfig.get(`/api/auth/me`)
                    .then(r => {
                        setLinkUser(r.data.id)
                        r.data.password = ''
                        setUserForm(r.data)
                        setUserSession(true)
                        toast.success('Datos cargados! Modifique lo que necesite.')
                    })
                    .catch(e => {
                        toast.error(e)
                        setStatus(401)
                    })
            }
        }

        fetchUser()
    }, []);

    const [userForm, setUserForm] = useState<UserUpdate>({
        username: '',
        email: '',
        password: null
    })

    const handleChangeUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUserForm({
            ...userForm,
            [name]: value
        })
    }

    const validateUser = (userForm: UserUpdate) => {
        let tempErrors: { [k: string]: any } = {};
        if (userForm.password == '') userForm.password = null
        axiosConfig.post(`/api/auth/validUpdate`, userForm)
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
            axiosConfig.put(`/api/auth/update`, userForm)
                .then(r => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    axiosConfig.get('/api/auth/signout', { withCredentials: false })
                        .then(() => setStatus(r.status))
                        .catch(() => toast.error("Por favor, recargue la pagina.", { position: "bottom-right" }))
                })
                .catch(e => {
                    let tempErrors: { [k: string]: any } = {}
                    for (const key in e.response.data) {
                        if (Object.prototype.hasOwnProperty.call(e.response.data, key)) tempErrors[key] = e.response.data[key]
                    }
                    setUserErrors(tempErrors)
                })
        }
    }

    if (status === 200) {
        toast.success('Actualizacion correcta, redireccionando...')
        redirect("/auth/login")
    } else if (status === 401) {
        if (!authContext) return null
        const { unauthorizedState } = authContext
        unauthorizedState(true)
    }

    return {
        userForm,
        userErrors,
        userSession,
        handleChangeUpdate,
        handleSubmit
    }
}
