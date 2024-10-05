import { useState, useEffect } from "react";


export const useUpdateCarrier = () => {
    const id = 1
    const [carrier, setCarrier] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        vehicleType: '',
        phone: '',
        date: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCarrier() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrier/${id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();


                setCarrier(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchCarrier();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCarrier({
            ...carrier,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(JSON.stringify(carrier))
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrier/${id}` , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carrier),
                
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData);
                setGeneralError('Error al modificar el repartidor. Por favor intentelo otra vez');
                throw new Error('Error al modificar al repartidor')
            }
            setSuccessMessage('Repartidor modificado');
            setCarrier({
                name: '',
                lastName: '',
                email: '',
                password: '',
                vehicleType: '',
                phone: '',
                date: ''
            });
            setError('');
            setGeneralError('');
        } catch (error) {
            setGeneralError('Error modificando al repartidor. Por favor Intentelo otra vez')
        }
    };

    return {
        carrier,
        error,
        successMessage,
        generalError,
        handleChange,
        handleSubmit
    };
}