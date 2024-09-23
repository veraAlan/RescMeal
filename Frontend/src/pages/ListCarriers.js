import React, { useEffect, useState } from 'react';

function CarrierList() {
    const [carriers, setCarriers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:8080/carriers')
            .then(response => response.json())
            .then(data => { console.log(data);
                setCarriers(data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Lista de repartidores</h2>
            {carriers.map(carrier =>
                <div className="text-2xl mb-4" key={carrier.id}>
                    <h1>{carrier.name}</h1>
                    <h3>{carrier.lastName}</h3>

                </div>
            )}
        </div>
        // <div>
        //     <h1> Carriers List</h1>
        //     <ul>
        //         {carriers.map(carrier => (
        //             <li key={carrier.idCarrier}>{carrier.name} {carrier.lastName}</li>
        //         ))}
        //     </ul>
        // </div>
    );
};


export default CarrierList;