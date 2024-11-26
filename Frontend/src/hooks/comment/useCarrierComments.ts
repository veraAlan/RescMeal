import axiosConfig from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

export const useListCarrierComments = (carrierid: string | null) => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [commentCarriers, setCommentCarriers] = useState(null)

    useEffect(() => {
        axiosConfig.get('/api/comment/' + carrierid)
            .then(r => {
                setCommentCarriers(r.data)
            })
            .catch(err => {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('An unknown error occurred')
                }
            })

}, []);

return { commentCarriers, error, loading };
}