import { useState } from 'react';
import { Food, FoodErrors } from '../../types/Food';
import { Business } from '../../types/Business';

export const useRegisterFood = () => {
    const [formData, setFormData] = useState<Food>({
        //TO DO Cuanto este el sistema de roles esto tiene que cambiarse.
        business: { id: 3 } as Business, // Ajusta según tu modelo de Business
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/food`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formDataToSend,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setErrors(errorData);
                    setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
                    throw new Error('Error al crear el alimento');
                }

                const data = await response.json();
                setSuccessMessage('Alimento registrado exitosamente.');
                setFormData({
                    business: { id: 1 } as Business, // Ajusta según tu modelo de Business
                    name: '',
                    category: '',
                    price: 0.0,
                    image: '',
                    description: '',
                    quantity: 1,
                    expiration_date: '',
                    production_date: ''
                });
                setImageData(null);
                setErrors({});
                setGeneralError('');
            } catch (error) {
                setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
            }
        }
    };

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