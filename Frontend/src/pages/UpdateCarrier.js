import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from '../api/axiosConfig';

const UpdateCarrier = () => {
    const { id } = useParams();
    const [carrier, setCarrier] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        vehicleType: '',
        phone: ''
    });

    useEffect(() => {
        axios.get(`/api/carrier/${id}`)
            .then(Response => setCarrier(Response.data))
            .catch(error => console.error('Error repartidor no encontrado', error));
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCarrier({ ...carrier, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/carrier/${id}`, carrier)
            .then(Response => console.log('Carrier Updated:', Response.data))
            .catch(error => console.error('Error updating carrier', error));
    };


    const handleDelete = () => {
        axios.delete(`/api/carrier/${id}`)
            .then(Response => console.log('Carrier deleted', Response.data))
            .catch(error => console.error('Error deleting carrier;', error));
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" value={carrier.name} className="border p-2 w-full" onChange={handleChange} />
            <input type='text' id='lastName' name='lastName' placeholder='lastName' className="border p-2 w-full" value={carrier.lastName} onChange={handleChange} />
            <input type='email' id='email' name='email' placeholder='Ingrese su email' className="border p-2 w-full" value={carrier.email} onChange={handleChange} />
            <input type='text' id='password' name='password' placeholder='contraseña' className="border p-2 w-full" value={carrier.password} onChange={handleChange} />
            <select id='vehicleType' name='vehicleType' className="border p-2 w-full"  onChange={handleChange}>
                <option value='Moto'> Moto </option>
                <option value='Auto'> Auto </option>
            </select>
            <input type="text" id="phone" name="phone" className="border p-2 w-full" value={carrier.phone} onChange={handleChange} />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
        </form>

        <div>
            <button onClick={handleDelete()}> Eliminar Cuenta </button>
        </div>
    </div>
    );
};

export default UpdateCarrier;