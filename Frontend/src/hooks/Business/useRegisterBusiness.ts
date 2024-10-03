import { useState } from 'react';
import { Business, BusinessErrors } from '../../types/Business';

export const useRegisterBusiness = () => {
    const [businessData, setBusinessData] = useState<Business>({
        name: '',
        type: '',
        address: '',
        email: '',
        password: '',
        phone: '',
        schedule: '',
        cvu: '',
        image: ''
    });

    const [imageData, setImageData] = useState<File | null>(null);
    const [errors, setErrors] = useState<BusinessErrors>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBusinessData({
            ...businessData,
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
        let tempErrors: BusinessErrors = {};
        if (!businessData.name) tempErrors.name = "El nombre es obligatorio";
        if (!businessData.type) tempErrors.type = "El tipo es obligatorio";
        if (!businessData.address) tempErrors.address = "La dirección es obligatoria";
        if (!businessData.email) tempErrors.email = "El correo electrónico es obligatorio";
        if (!businessData.password) tempErrors.password = "La contraseña es obligatoria";
        if (!businessData.phone) tempErrors.phone = "El teléfono es obligatorio";
        if (!businessData.schedule) tempErrors.schedule = "El horario es obligatorio";
        if (!businessData.cvu) tempErrors.cvu = "El CVU es obligatorio";
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("business", JSON.stringify(businessData));
            if (imageData) {
                formData.append("image", imageData);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setErrors(errorData);
                    setGeneralError('Error registrando negocio. Por favor, inténtelo de nuevo.');
                    throw new Error('Error al crear el negocio');
                }
                const data = await response.json();
                setSuccessMessage('Negocio registrado exitosamente');
                setBusinessData({
                    name: '',
                    type: '',
                    address: '',
                    email: '',
                    password: '',
                    phone: '',
                    schedule: '',
                    cvu: '',
                    image: data.image
                });
                setImageData(null);
                setErrors({});
                setGeneralError('');
            } catch (error) {
                setGeneralError('Error registrando negocio. Por favor, inténtelo de nuevo.');
            }
        }
    };

    return {
        businessData,
        imageData,
        errors,
        successMessage,
        generalError,
        handleChange,
        handleImage,
        handleSubmit
    };
};