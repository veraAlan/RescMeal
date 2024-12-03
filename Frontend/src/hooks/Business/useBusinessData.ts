'use client';
import { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import useBusinessById from '@/hooks/Business/useBusiness';
import useListFoods from '@/hooks/Food/useListFoods';
import normalizeDate from '../../utils/normalizeDate';
import normalizePhone from '../../utils/normalizePhone';

const useBusinessData = (businessId) => {
    const { business, isLoading: businessLoading } = useBusinessById({ businessId });
    const { foods, error, isLoading: foodsLoading } = useListFoods();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (business) {
            axiosInstance.get(`/api/review/list/${business.id}`)
                .then(response => setReviews(response.data))
                .catch(error => console.error('Error fetching reviews:', error));
        }
    }, [business]);

    const filteredFoods = useMemo(() => foods.filter(food => food.business.id === business.id), [foods, business]);

    return { business, businessLoading, foodsLoading, error, filteredFoods, reviews, normalizeDate, normalizePhone };
};

export default useBusinessData;