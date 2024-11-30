import { useState, useEffect } from 'react';
import { Business } from '../../types/Business';
import axiosConfig from '@/utils/axiosConfig';

interface BusinessPage extends Array<Business> { }

export function useListBusinesses() {
    const [page, setPage] = useState<number>()
    const [size, setSize] = useState<number>()
    const [businesses, setBusinesses] = useState<BusinessPage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosConfig.get(`/api/business/list`, { params: { page, size } })
        .then(r => {
            for(const business of r.data._embedded.businessList) {
                business.image = '/Business/' + business.image
            }
            setBusinesses(r.data._embedded.businessList)
        })
        .catch(e => {
            console.error('Error fetching data: ', e)
            if (e instanceof Error){
                setError(e.message)
            }else {
                setError('An unknown error occurred')
            }
        })
    }, []);

    return { businesses, loading, error };
}