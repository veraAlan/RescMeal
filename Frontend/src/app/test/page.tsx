'use client';

import React from 'react';
import CarrierList from '../../components/Carrier/CarrierList';
import BusinessList from '../../components/Business/BusinessList';
import ClientList from '../../components/Client/ClientList';

const TestPage: React.FC = () => {
    return (
        <div>
            <CarrierList />
            <BusinessList />
            <ClientList />
        </div>
    );
};

export default TestPage;