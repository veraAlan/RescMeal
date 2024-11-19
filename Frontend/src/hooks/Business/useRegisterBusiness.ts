import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';

export interface Business {
    name?: string
    type?: string
    address?: string
    address_lat?: number
    address_long?: number
    phone?: string
    schedule?: string
    cvu?: string
}

export interface User {
    username?: string
    email?: string
    role?: string
    password?: string
}

export interface linkUser {
    id?: number
}

export interface linkBusiness {
    business?: number
}

export const useRegisterBusiness = () => {
    const [userSession, setUserSession] = useState<Boolean | null>(null)
    const [hasBusiness, setHasBusiness] = useState<Boolean | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)
    const [generalError, setGeneralError] = useState<string | null>(null)

    const [address, setAddress] = useState<string>('Neuquén Capital');
    const [address_lat, setAddressLat] = useState<number>(-38.9517);
    const [address_long, setAddressLong] = useState<number>(-68.0591);

    if (userSession == null) {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, { withCredentials: true })
            .then(r => {
                setUserSession(true)
            })
            .catch(e => {
                setUserSession(false)
            })
    }

    // TODO Solve: Loading more than one time
    if (hasBusiness == null) {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/session-id`, { withCredentials: true })
            .then(r => {
                setHasBusiness(true)
            })
            .catch(e => {
                setHasBusiness(false)
            })
    }

    const [businessForm, setBusinessData] = useState<Business>({
        name: '',
        type: '',
        address: '',
        address_lat: 0,
        address_long: 0,
        phone: '',
        schedule: '',
        cvu: ''
    });

    const [userForm, setRegisterData] = useState<User>({
        username: '',
        email: '',
        role: 'business',
        password: ''
    })

    const [linkUser, setLinkUser] = useState<linkUser>({
        id: 0,
    })

    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setRegisterData({
            ...userForm,
            [name]: value
        })
    }

    const [imageForm, setImageData] = useState<File | null>(null);
    const [userErrors, setUserErrors] = useState<User>({});
    const [businessErrors, setBusinessErrors] = useState<Business>({});
    const [status, setStatus] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBusinessData({
            ...businessForm,
            [name]: value
        });
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                setImageData(file);
            } else {
                setImageError('Solo se permiten imágenes JPEG o PNG');
            }
        }
    };

    const validateUser = (userForm: User) => {
        let tempErrors: { [k: string]: any } = {};

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/valid`, userForm, { withCredentials: true })
            .then(() => { setUserErrors({}) })
            .catch(error => {
                console.log("Error: ", error)
                for (const key in error.response.data) {
                    if (Object.prototype.hasOwnProperty.call(error.response.data, key)) {
                        tempErrors[key] = error.response.data[key];
                    }
                }
                setUserErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0;
    };

    const validateBusiness = (businessForm: Business): boolean => {
        let tempErrors: { [k: string]: any } = {};

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/business/valid`, businessForm, { withCredentials: true })
            .then(() => { setBusinessErrors({}) })
            .catch(error => {
                for (const key in error.response.data) {
                    if (Object.prototype.hasOwnProperty.call(error.response.data, key)) {
                        tempErrors[key] = error.response.data[key];
                    }
                }
                setBusinessErrors(tempErrors)
            })

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateUser(userForm) && !userSession) {
            console.log("Sent userForm: ", userForm)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, userForm, { withCredentials: true })
                .then(r => {
                    setUserSession(true)
                })
                .catch(e => {
                    console.log("Error creating user: ", e)
                    setGeneralError(e.response.data)
                })
        }

        if (validateBusiness(businessForm) && userSession) {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true })
                .then(r => {
                    setLinkUser(r.data.id)

                    console.log("Object businessForm: ", businessForm)

                    const businessData = new FormData()
                    businessForm.address = address
                    businessForm.address_lat = address_lat
                    businessForm.address_long = address_long
                    businessData.append("business", new Blob([JSON.stringify(businessForm)], { type: 'application/json' }))
                    businessData.append("user", new Blob([JSON.stringify(linkUser)], { type: 'application/json' }))
                    if (imageForm) {
                        businessData.append("image", imageForm)
                    }

                    console.log("Sent businessForm: ", businessData)
                    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/business`,
                        businessData, {
                        headers: {
                            'Content-Type': 'multipart/mixed'
                        },
                        withCredentials: true
                    }).then(r => {
                        setStatus(r.status)
                    }).catch(e => {
                        console.log("Error creating business: ", e)
                    })
                })
                .catch(e => {
                    setGeneralError("Error cargando el local, por favor intente nuevamente.")
                    console.log("Error finding session: ", e)
                })
        }

        if (status === 200 || status === 201) {
            redirect("/")
        }
    };

    return {
        businessForm,
        userForm,
        imageForm,
        userErrors,
        businessErrors,
        imageError,
        generalError,
        userSession,
        hasBusiness,
        setAddress,
        setAddressLat,
        setAddressLong,
        handleChange,
        handleImage,
        handleSubmit,
        handleChangeRegister
    };
};