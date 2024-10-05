import React from "react";
import { useUpdateCarrier } from "../../hooks/Carrier/useUpdateCarrier";

const UpdateCarrier: React.FC = () => {
    const {
        carrier,
        error,
        successMessage,
        generalError,
        handleChange,
        handleSubmit
    } = useUpdateCarrier();

    return (
        <div id="myElement" className="container mx-auto p-4">
            <h2 className="text-2x1 mb-4">Modificar repartidor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="bloc">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={carrier.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                </div>
                <div>
                    <label className="block">Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        value={carrier.lastName}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                </div>
                <div>
                    <label className="block">Corre Electronico</label>
                    <input
                        type="email"
                        name="email"
                        value={carrier.email}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={30}
                    />
                </div>
                <div>
                    <label className="block">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={carrier.password}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={30}
                    />
                </div>
                <div>
                    <label className="block">Tipo de Vehículo</label>
                    <select id='vehicleType' name='vehicleType' className="border p-2 w-full" onChange={handleChange}>
                        <option value='Moto'> Moto </option>
                        <option value='Auto'> Auto </option>
                    </select>
                </div>
                <div>
                    <label className="block">Telefono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={carrier.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={15}
                    />
                </div>
                <div>
                    <label className="block">Fecha:</label>
                    <input
                        type="date"
                        name="date"
                        value={carrier.date}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {generalError && <p className="text-red-500">{generalError}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Modificar</button>
            </form>
        </div>
    );
};

export default UpdateCarrier;