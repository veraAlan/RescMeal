import { useEffect, useState } from "react"
import axiosConfig from "@/utils/axiosConfig"
import { Business } from "@/types/Business"

const useBusinessById = ({ businessId }: { businessId: number }) => {
    const [business, setBusiness] = useState<Business | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axiosConfig.get(`/api/business/${businessId}`)
            .then(r => {
                setBusiness(r.data)
            })
            .catch(e => {
                if (e instanceof Error) {
                    setError(e.message)
                } else {
                    setError('An unknown error occurred')
                }
            })
    }, []);

    return {business, error}
}

export default useBusinessById