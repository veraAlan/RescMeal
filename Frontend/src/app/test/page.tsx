'use client';

import React from 'react';
import CarrierList from '../../components/Carrier/CarrierList';
import BusinessList from '../../components/Business/BusinessList';
import ClientList from '../../components/Client/ClientList';
import FoodList from '../../components/Food/FoodList';

const TestPage: React.FC = () => {
    return (
        <div>
            <CarrierList />
            <BusinessList />
            <ClientList />
            <FoodList />
        </div>
    );
};

export default TestPage;
