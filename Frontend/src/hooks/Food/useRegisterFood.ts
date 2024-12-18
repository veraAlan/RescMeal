// import { useState, useEffect } from 'react';
// import { Food, FoodErrors } from '../../types/Food';
// import { Business } from '../../types/Business';
// import { getSessionId } from '../../utils/getSessionId';
// import axiosConfig from '@/utils/axiosConfig';
// import { redirect } from 'next/navigation';

// export const useRegisterFood = () => {
//     const [formData, setFormData] = useState<Food>({
//         business: { id: 0 } as Business,
//         name: '',
//         category: '',
//         price: 0.0,
//         image: '',
//         description: '',
//         quantity: 1,
//         expiration_date: '',
//         production_date: ''
//     });

//     const [imageData, setImageData] = useState<File | null>(null);
//     const [errors, setErrors] = useState<FoodErrors>({});
//     const [successMessage, setSuccessMessage] = useState('');
//     const [generalError, setGeneralError] = useState('');
//     const [status, setStatus] = useState(400);

//     useEffect(() => {
//         const fetchSessionId = async () => {
//             try {
//                 const sessionId = await getSessionId();
//                 setFormData(prevFormData => ({
//                     ...prevFormData,
//                     business: { id: sessionId } as Business
//                 }));
//             } catch (error) {
//                 setGeneralError('Error obteniendo el ID de la sesión.');
//             }
//         };

//         fetchSessionId();
//     }, []);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             const file = e.target.files[0];
//             if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
//                 setImageData(file);
//             } else {
//                 setErrors({ ...errors, image: 'Solo se permiten imágenes JPEG o PNG' });
//             }
//         }
//     };

//     const validate = (): boolean => {
//         let tempErrors: FoodErrors = {};
//         if (!formData.name) tempErrors.name = "El nombre es obligatorio";
//         if (!formData.category) tempErrors.category = "La categoría es obligatoria";
//         if (formData.price <= 0) tempErrors.price = "El precio debe ser mayor que 0";
//         if (formData.quantity <= 0) tempErrors.quantity = "La cantidad debe ser mayor que 0";
//         if (!formData.expiration_date) tempErrors.expiration_date = "La fecha de vencimiento es obligatoria";
//         if (!formData.production_date) tempErrors.production_date = "La fecha de producción es obligatoria";
//         if (!imageData) tempErrors.image = "La imagen es obligatoria";
//         setErrors(tempErrors);
//         return Object.keys(tempErrors).length === 0;
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (validate()) {
//             const formDataToSend = new FormData();
//             formDataToSend.append("food", JSON.stringify(formData));
//             if (imageData) {
//                 formDataToSend.append("image", imageData);
//             }
//             try {
//                 const response = await axiosConfig.post(`/api/food`, formDataToSend, {
//                     headers: { 'Accept': 'application/json' }
//                 });
//                 if (response.status !== 200) {
//                     const errorData = response.data;
//                     setErrors(errorData);
//                     setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
//                     throw new Error('Error al crear el alimento');
//                 }
//                 const data = response.data;
//                 setSuccessMessage('Alimento registrado exitosamente.');
//                 setFormData({
//                     business: { id: 0 } as Business, // Esto se actualizará con el ID real
//                     name: '',
//                     category: '',
//                     price: 0.0,
//                     image: '',
//                     description: '',
//                     quantity: 1,
//                     expiration_date: '',
//                     production_date: ''
//                 });
//                 setStatus(response.status)
//                 setImageData(null);
//                 setErrors({});
//                 setGeneralError('');
//             } catch (error) {
//                 setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
//             }
//         }
//     };

//     if (status === 200) {
//         setTimeout(redirect("/auth/me"), 5000)
//     }

//     return {
//         formData,
//         errors,
//         successMessage,
//         generalError,
//         handleChange,
//         handleImage,
//         handleSubmit
//     };
// };


import { useState, useEffect } from 'react';
import { Food, FoodErrors } from '../../types/Food';
import { Business } from '../../types/Business';
import axiosConfig from '@/utils/axiosConfig';
import { redirect } from 'next/navigation';

export const useRegisterFood = () => {
    const [formData, setFormData] = useState<Food>({
        business: { id: 0 } as Business,
        name: '',
        category: '',
        price: 0.0,
        image: '',
        description: '',
        quantity: 1,
        expiration_date: '',
        production_date: ''
    });

    const [imageData, setImageData] = useState<File | null>(null);
    const [errors, setErrors] = useState<FoodErrors>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [status, setStatus] = useState(400);

    useEffect(() => {
        const fetchBusinessId = async () => {
            try {
                const response = await axiosConfig.get('/api/auth/me');
                const businessId = response.data.business.id;
                setFormData(prevFormData => ({
                    ...prevFormData,
                    business: { id: businessId } as Business
                }));
            } catch (error) {
                setGeneralError('Error obteniendo el ID del negocio.');
            }
        };

        fetchBusinessId();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                setImageData(file);
            } else {
                setErrors({ ...errors, image: 'Solo se permiten imágenes JPEG o PNG' });
            }
        }
    };

    const validate = (): boolean => {
        let tempErrors: FoodErrors = {};
        if (!formData.name) tempErrors.name = "El nombre es obligatorio";
        if (!formData.category) tempErrors.category = "La categoría es obligatoria";
        if (formData.price <= 0) tempErrors.price = "El precio debe ser mayor que 0";
        if (formData.quantity <= 0) tempErrors.quantity = "La cantidad debe ser mayor que 0";
        if (!formData.expiration_date) tempErrors.expiration_date = "La fecha de vencimiento es obligatoria";
        if (!formData.production_date) tempErrors.production_date = "La fecha de producción es obligatoria";
        if (!imageData) tempErrors.image = "La imagen es obligatoria";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            const formDataToSend = new FormData();
            formDataToSend.append("food", JSON.stringify(formData));
            if (imageData) {
                formDataToSend.append("image", imageData);
            }
            try {
                const response = await axiosConfig.post(`/api/food`, formDataToSend, {
                    headers: { 'Accept': 'application/json' }
                });
                if (response.status !== 200) {
                    const errorData = response.data;
                    setErrors(errorData);
                    setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
                    throw new Error('Error al crear el alimento');
                }
                const data = response.data;
                setSuccessMessage('Alimento registrado exitosamente.');
                setFormData({
                    business: { id: 0 } as Business, // Esto se actualizará con el ID real
                    name: '',
                    category: '',
                    price: 0.0,
                    image: '',
                    description: '',
                    quantity: 1,
                    expiration_date: '',
                    production_date: ''
                });
                setStatus(response.status);
                setImageData(null);
                setErrors({});
                setGeneralError('');
            } catch (error) {
                setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
            }
        }
    };

    if (status === 200) {
        setTimeout(() => redirect("/auth/me"), 5000);
    }

    return {
        formData,
        errors,
        successMessage,
        generalError,
        handleChange,
        handleImage,
        handleSubmit
    };
};
