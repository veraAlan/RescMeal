import { useContext, useState, useEffect } from 'react';
import axiosConfig from '@/utils/axiosConfig';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

export interface Business {
    name?: string;
    type?: string;
    address?: string;
    address_lat?: number;
    address_long?: number;
    phone?: string;
    schedule?: string;
    cvu?: string;
}

export interface User {
    username?: string;
    email?: string;
    role?: string;
    password?: string;
}

export interface linkUser {
    id?: number;
}

export const useRegisterBusiness = () => {
    const [userSession, setUserSession] = useState<boolean | null>(null);
    const [hasBusiness, setHasBusiness] = useState<boolean | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [linkUser, setLinkUser] = useState<linkUser>({ id: 0 });
    const [status, setStatus] = useState<number>(0);
    const authContext = useContext(AuthContext);

    const [address, setAddress] = useState<string>('Neuquén Capital');
    const [address_lat, setAddressLat] = useState<number>(0);
    const [address_long, setAddressLong] = useState<number>(0);

    const [businessForm, setBusinessData] = useState<Business>({
        name: '',
        type: '',
        address: address,
        address_lat: address_lat,
        address_long: address_long,
        phone: '',
        schedule: '',
        cvu: ''
    });

    const [userForm, setRegisterData] = useState<User>({
        username: '',
        email: '',
        role: 'business',
        password: ''
    });

    const [imageForm, setImageData] = useState<File | null>(null);

    const [userErrors, setUserErrors] = useState<User>({});
    const [businessErrors, setBusinessErrors] = useState<Business>({});

    useEffect(() => {
        if (userSession == null) {
            axiosConfig.get(`/api/auth/validate`)
                .then(() => setUserSession(true))
                .catch(() => setUserSession(false));
        }

        if (hasBusiness == null) {
            axiosConfig.get(`/api/auth/session-id`)
                .then(r => { if (r.status === 200) setHasBusiness(true); })
                .catch(() => setHasBusiness(false));
        }
    }, [userSession, hasBusiness]);

    useEffect(() => {
        setBusinessData(prevState => ({
            ...prevState,
            address,
            address_lat,
            address_long
        }));
    }, [address, address_lat, address_long]);

    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegisterData({
            ...userForm,
            [name]: value
        });
    };

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

    const validateUser = async (userForm: User) => {
        let tempErrors: { [k: string]: any } = {};

        try {
            await axiosConfig.post(`/api/auth/valid`, userForm, { withCredentials: true });
            setUserErrors({});
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const err = error as { [key: string]: any };
                for (const key in err.response.data) {
                    if (Object.prototype.hasOwnProperty.call(err.response.data, key)) {
                        tempErrors[key] = err.response.data[key];
                    }
                }
            }
            setUserErrors(tempErrors);
        }

        return Object.keys(tempErrors).length === 0;
    };

    const validateBusiness = async (businessForm: Business) => {
        let tempErrors: { [k: string]: any } = {};

        try {
            await axiosConfig.post(`/api/business/valid`, businessForm, { withCredentials: true });
            setBusinessErrors({});
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const err = error as { [key: string]: any };
                for (const key in err.response.data) {
                    if (Object.prototype.hasOwnProperty.call(err.response.data, key)) {
                        tempErrors[key] = err.response.data[key];
                    }
                }
            }
            setBusinessErrors(tempErrors);
        }

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (await validateUser(userForm) && !userSession) {
            try {
                const response = await axiosConfig.post(`/api/auth/signup`, userForm);
                if (authContext) {
                    const { login } = authContext;
                    login(response.data.token);
                }
                setLinkUser({ id: response.data.id });
                setUserSession(true);
            } catch (e: unknown) {
                let tempErrors: { [k: string]: any } = {};
                if (typeof e === 'object' && e !== null && 'response' in e) {
                    const err = e as { [key: string]: any };
                    for (const key in err.response.data) {
                        if (Object.prototype.hasOwnProperty.call(err.response.data, key)) {
                            tempErrors[key] = err.response.data[key];
                        }
                    }
                }
                setUserErrors(tempErrors);
            }
        }

        if (await validateBusiness(businessForm) && userSession) {
            try {
                setBusinessData(prevState => ({
                    ...prevState,
                    address,
                    address_lat,
                    address_long
                }));

                const businessData = new FormData();
                businessData.append("business", new Blob([JSON.stringify(businessForm)], { type: 'application/json' }));
                businessData.append("user", new Blob([JSON.stringify(linkUser.id)], { type: 'application/json' }));
                if (imageForm) {
                    businessData.append("image", imageForm);
                }

                const response = await axiosConfig.post(`/api/business`, businessData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setStatus(response.status);
            } catch (e: unknown) {
                let tempErrors: { [k: string]: any } = {};
                if (typeof e === 'object' && e !== null && 'response' in e) {
                    const err = e as { [key: string]: any };
                    for (const key in err.response.data) {
                        if (Object.prototype.hasOwnProperty.call(err.response.data, key)) {
                            tempErrors[key] = err.response.data[key];
                        }
                    }
                }
                setBusinessErrors(tempErrors);
            }
        }
    };

    if (status === 200 || status === 201) {
        setTimeout(() => redirect("/"), 1000);
    }

    return {
        businessForm,
        setBusinessData,
        userForm,
        userErrors,
        businessErrors,
        imageError,
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
