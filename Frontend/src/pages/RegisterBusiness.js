import React, { useState } from 'react';
import axios from '../api/axiosConfig';

function RegisterBusiness() {
    const [businessData, setBusiness] = useState({
        name: '',
        type: '',
        address: '',
        email: '',
        password: '',
        phone: '',
        schedule: '',
        cvu: ''
    });

    const [imageData, setImage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusiness({
            ...businessData,
            [name]: value
        });
    };

    // Handle image update.
    const handlePhoto = async (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("business", JSON.stringify(businessData));
        formData.append("image", imageData);

        try { 
            const response = await axios.post('http://localhost:8080/api/business', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Negocio registrado:', response.data);
        } catch (error) {
            console.error('Error registrando negocio:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Negocio</h2>
            <form className="space-y-4">
                <div>
                    <label className="block">Foto del Negocio:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handlePhoto}
                        className="border p-2 w-full"
                    />
                </div>
            </form>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre del Negocio:</label>
                    <input
                        type="text"
                        name="name"
                        value={businessData.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Tipo de Negocio:</label>
                    <input
                        type="text"
                        name="type"
                        value={businessData.type}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={businessData.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={businessData.email}
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
                        value={businessData.password}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={businessData.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Horario del Negocio:</label>
                    <input
                        type="text"
                        name="schedule"
                        value={businessData.schedule}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">CVU:</label>
                    <input
                        type="text"
                        name="cvu"
                        value={businessData.cvu}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        </div>
    );
}

export default RegisterBusiness;
