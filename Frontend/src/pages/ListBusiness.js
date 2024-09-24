import React, { useState, useEffect } from 'react';

function ListBusiness() {
  const [businesses, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:8080/api/business/list")
      .then(response => response.json())
      .then(data => {
        setBusinessList(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching business list:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Lista de Negocios</h2>
      {businesses.map(business =>
        <div className="text-2xl mb-4" key={business.id}>
          <h1>{business.business_name}</h1>
          <h3>{business.business_type}</h3>
          <h3>{business.phone}</h3>
          <h3>{business.email}</h3>
          {business.businessPhoto && (
            <img
              src={"data:image;base64," + business.businessPhoto.photo}
              alt={business.business_name + " logo."}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ListBusiness;
