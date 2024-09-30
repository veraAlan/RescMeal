import React, { useState } from 'react';

function RegisterClient() {
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        birthdate: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('http://localhost:8080/api/clients', {
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

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="20"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <label className="block">Apellido:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="20"
                    />
                    {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                </div>
                <div>
                    <label className="block">Correo Electrónico:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="30"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <label className="block">Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="20"
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="35"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div>
                    <label className="block">Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="60"
                    />
                    {errors.address && <p className="text-red-500">{errors.address}</p>}
                </div>
                <div>
                    <label className="block">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.birthdate && <p className="text-red-500">{errors.birthdate}</p>}
                </div>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {generalError && <p className="text-red-500">{generalError}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        </div>
    );
    
}

export default RegisterClient;
