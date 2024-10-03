import { useState } from 'react';
import { Carrier, CarrierErrors } from '../../types/Carrier';

export const useRegisterCarrier = () => {
    const [formData, setFormData] = useState<Carrier>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        vehicleType: '',
        phone: '',
        date: ''
    });

    const [errors, setErrors] = useState<CarrierErrors>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = (): boolean => {
        let tempErrors: CarrierErrors = {};
        if (!formData.name) tempErrors.name = "El nombre es obligatorio";
        if (!formData.lastName) tempErrors.lastName = "El apellido es obligatorio";
        if (!formData.email) tempErrors.email = "El correo electrónico es obligatorio";
        if (!formData.password) tempErrors.password = "La contraseña es obligatoria";
        if (!formData.vehicleType) tempErrors.vehicleType = "El tipo de vehículo es obligatorio";
        if (!formData.phone) tempErrors.phone = "El teléfono es obligatorio";
        if (!formData.date) tempErrors.date = "La fecha es obligatoria";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrier`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setErrors(errorData);
                    setGeneralError('Error registrando carrier. Por favor, inténtelo de nuevo.');
                    throw new Error('Error al crear el carrier');
                }
                setSuccessMessage('Carrier registrado exitosamente');
                setFormData({
                    name: '',
                    lastName: '',
                    email: '',
                    password: '',
                    vehicleType: '',
                    phone: '',
                    date: ''
                });
                setErrors({});
                setGeneralError('');
            } catch (error) {
                setGeneralError('Error registrando carrier. Por favor, inténtelo de nuevo.');
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