import React, { useState } from 'react';
import axios from '../api/axiosConfig';

function RegisterCarrier() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        vehicleType: '',
        phone: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/carriers', formData);
            console.log('Carrier registrado:', response.data);
            // Puedes agregar lógica adicional aquí, como redirigir al usuario o mostrar un mensaje de éxito.
        } catch (error) {
            console.error('Error registrando carrier:', error);
            // Puedes manejar el error aquí, como mostrar un mensaje de error al usuario.
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Carrier</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Apellido:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Tipo de Vehículo:</label>
                    <input
                        type="text"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Fecha:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        </div>
    );
}

export default RegisterCarrier;
