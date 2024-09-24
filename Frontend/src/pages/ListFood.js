import React, { useState, useEffect } from 'react';

function ListFood() {
    const [foods, setFoodList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:8080/api/foods/list')
            .then(response => response.json())
            .then(data => {
                setFoodList(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching food list:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Lista de Comidas</h2>
            {console.log(foods)}
            {foods.map(food =>
                <div className="text-2xl mb-4" key={food.idFood}>
                    <h1>{food.foodName}</h1>
                    <h3>{food.category}</h3>
                    <h3>{food.price}</h3>
                    <h3>{food.description}</h3>
                    <h3>{food.quantity}</h3>
                    <h3>{food.expirationDate}</h3>
                    <h3>{food.productionDate}</h3>
                    {food.foodPhoto && (
                        <img
                            src={`data:image/jpeg;base64,${food.foodPhoto.photo}`}
                            alt={`${food.foodName}`}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default ListFood;
