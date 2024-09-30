import React, { useState } from 'react';

function RegisterFood() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        description: '',
        quantity: '',
        expiration_date: '',
        production_date: ''
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

    const handlePhoto = async (e) => {
        const imageData = new FormData();
        imageData.append("image", e.target.files[0]);

        try {
            const resImage = await fetch('http://localhost:8080/api/foods/image', {
                method: "POST",
                body: imageData
            });
            const data = await resImage.json();
            setFormData({
                ...formData,
                image: data.imageUrl // Ajusta esto según la respuesta de tu API
            });
        } catch (error) {
            console.log("Cannot load image.");
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "El nombre es obligatorio";
        if (!formData.category) tempErrors.category = "La categoría es obligatoria";
        if (!formData.price) tempErrors.price = "El precio es obligatorio";
        if (!formData.description) tempErrors.description = "La descripción es obligatoria";
        if (!formData.quantity) tempErrors.quantity = "La cantidad es obligatoria";
        if (!formData.expiration_date) tempErrors.expiration_date = "La fecha de vencimiento es obligatoria";
        if (!formData.production_date) tempErrors.production_date = "La fecha de producción es obligatoria";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('http://localhost:8080/api/foods', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setErrors(errorData);
                    setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
                } else {
                    setSuccessMessage('Alimento registrado exitosamente.');
                    setFormData({
                        name: '',
                        category: '',
                        price: '',
                        image: '',
                        description: '',
                        quantity: '',
                        expiration_date: '',
                        production_date: ''
                    });
                    setErrors({});
                    setGeneralError('');
                }
            } catch (error) {
                console.error('Error registrando alimento:', error);
                setGeneralError('Error registrando alimento. Por favor, inténtelo de nuevo.');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Alimento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="50"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <label className="block">Categoría:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="30"
                    />
                    {errors.category && <p className="text-red-500">{errors.category}</p>}
                </div>
                <div>
                    <label className="block">Precio:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.price && <p className="text-red-500">{errors.price}</p>}
                </div>
                <div>
                    <label className="block">Imagen:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handlePhoto}
                        className="border p-2 w-full"
                    />
                    {errors.image && <p className="text-red-500">{errors.image}</p>}
                </div>
                <div>
                    <label className="block">Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength="200"
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </div>
                <div>
                    <label className="block">Cantidad:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                </div>
                <div>
                    <label className="block">Fecha de Vencimiento:</label>
                    <input
                        type="date"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.expiration_date && <p className="text-red-500">{errors.expiration_date}</p>}
                </div>
                <div>
                    <label className="block">Fecha de Producción:</label>
                    <input
                        type="date"
                        name="production_date"
                        value={formData.production_date}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.production_date && <p className="text-red-500">{errors.production_date}</p>}
                </div>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {generalError && <p className="text-red-500">{generalError}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar Alimento</button>
            </form>
        </div>
    );
}

export default RegisterFood;
