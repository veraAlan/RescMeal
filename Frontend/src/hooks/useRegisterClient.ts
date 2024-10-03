import { useState } from 'react';
import { Client, ClientErrors } from '../types/Client';

export const useRegisterClient = () => {
    const [formData, setFormData] = useState<Client>({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        birthdate: ''
    });

    const [errors, setErrors] = useState<ClientErrors>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = (): boolean => {
        let tempErrors: ClientErrors = {};
        if (!formData.name) tempErrors.name = "El nombre es obligatorio";
        if (!formData.last_name) tempErrors.last_name = "El apellido es obligatorio";
        if (!formData.email) tempErrors.email = "El correo electrónico es obligatorio";
        if (!formData.phone) tempErrors.phone = "El teléfono es obligatorio";
        if (!formData.password) tempErrors.password = "La contraseña es obligatoria";
        if (!formData.address) tempErrors.address = "La dirección es obligatoria";
        if (!formData.birthdate) tempErrors.birthdate = "La fecha de nacimiento es obligatoria";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setErrors(errorData);
                    setGeneralError('Error registrando cliente. Por favor, inténtelo de nuevo.');
                    throw new Error('Error al crear el cliente');
                }
                setSuccessMessage('Cliente registrado exitosamente');
                setFormData({
                    name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    password: '',
                    address: '',
                    birthdate: ''
                });
                setErrors({});
                setGeneralError('');
            } catch (error) {
                setGeneralError('Error registrando cliente. Por favor, inténtelo de nuevo.');
            }
        }
    };

    return {
        formData,
        errors,
        successMessage,
        generalError,
        handleChange,
        handleSubmit
    };
};