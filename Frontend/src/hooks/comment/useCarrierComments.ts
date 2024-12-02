import axiosConfig from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
import { Comment } from "@/types/Comment";

export const useListCarrierComments = ({carrierId}: {carrierId: number}) => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [commentCarriers, setCommentCarriers] = useState<Comment | null>(null)

    useEffect(() => {
        axiosConfig.get(`/api/comment/commentsCarrier/${carrierId}`)
            .then(r => {
                setCommentCarriers(r.data._embedded.commentList)
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