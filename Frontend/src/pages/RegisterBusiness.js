import React, { useState } from 'react';
import axios from '../api/axiosConfig';

function RegisterBusiness() {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        address: '',
        email: '',
        password: '',
        phone: '',
        schedule: '',
        CVU: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle auto-upload of photo in form.
    // TODO Set correct string to formData.image
    const handlePhoto = async (e) => {
        const imageData = new FormData();
        imageData.append("image", e.target.files[0]);

        try {
            const resImage = await fetch('http://localhost:8080/api/business/image', {
                method: "POST",
                body: imageData
            }).then((resImage) => {
                resImage.json().then( data => setFormData.image = data);
            }).catch(err => {
               console.log(err);
            });
        } catch (error) {
            console.log("Cannot load image.");
        }

    }

    // Not Working, Content-Type: Multipart/Form-Data not supported.
    // TODO check actual info sent, check logic in BusinessController.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        console.log('Form to Send:', formDataToSend);

        try {
            
            const response = await fetch('http://localhost:8080/api/business', {
                method: "POST",
                body: formDataToSend
            });
            console.log('Negocio registrado:', response.data);
        } catch (error) {
            console.error('Error registrando negocio:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Negocio</h2>
            <form className="space-y-4" encType='multipart/form-data'>
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
                        value={formData.name}
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
                        value={formData.type}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
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
                    <label className="block">Horario del Negocio:</label>
                    <input
                        type="text"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">CVU:</label>
                    <input
                        type="text"
                        name="CVU"
                        value={formData.CVU}
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
