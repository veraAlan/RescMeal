"use client";
import React from 'react';
import useDelivery from '../../hooks/Delivery/useDelivery';
import ListDelivery from '../../components/Delivery/ListDelivery';

const Page: React.FC = () => {
    const { purchases, loading, error, handleTakeOrder } = useDelivery();

    return (
        <ListDelivery
            purchases={purchases}
            loading={loading}
            error={error}
            handleTakeOrder={handleTakeOrder}
        />
    );
};

export default Page;