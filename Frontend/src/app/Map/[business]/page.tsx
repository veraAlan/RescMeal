'use client';
import React from 'react';
import Business from '../../../components/Business/Business';
import useBusinessData from '../../../hooks/Business/useBusinessData';

interface Params {
    business: number;
}

export default function Page({ params }: { params: Params }) {
    const { business, businessLoading, foodsLoading, filteredFoods, reviews, normalizeDate, normalizePhone } = useBusinessData(params.business) || {};

    if (businessLoading || foodsLoading) {
        return <div className="text-center text-blue-500 text-xl mt-10">Cargando...</div>;
    }

    if (!business) {
        return <div className="text-center text-red-500 text-xl mt-10">Error: No se encuentra ningún Local</div>;
    }

    return (
        <Business
            business={business}
            foods={filteredFoods}
            reviews={reviews}
            normalizeDate={normalizeDate}
            normalizePhone={normalizePhone}
        />
    );
}
