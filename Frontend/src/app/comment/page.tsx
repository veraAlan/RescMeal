"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Business {
    id: number;
    name: string;
}

interface PurchasedItem {
    id: number;
    business: Business;
}

interface Purchase {
    id: number;
    total_cost: number;
    creation_date: string;
    purchasedItems: PurchasedItem[];
}

interface Comment {
    id: number;
    purchase: Purchase;
    description: string;
}

interface Review {
    id: number;
    purchase: Purchase;
    description: string;
}



const Page: React.FC = () => {
    const [clientId, setClientId] = useState<number | null>(null);
    const [lastPurchaseId, setLastPurchaseId] = useState<number | null>(null);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [carrierId, setCarrierId] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [review, setReview] = useState<string>('');
    const [rating, setRating] = useState<number | null>(null);
    const [isCommentSubmitted, setIsCommentSubmitted] = useState<boolean>(false);
    const [isReviewSubmitted, setIsReviewSubmitted] = useState<boolean>(false);
    const [lastComment, setLastComment] = useState<Comment | null>(null); 
    const [lastReview, setLastReview] = useState<Review | null>(null);

    const shouldHideCommentForm = () => lastComment !== null && lastComment.purchase.id === lastPurchaseId;
    const shouldHideReviewForm = () => lastReview !== null && lastReview.purchase.id === lastPurchaseId;    
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true });
                setClientId(response.data.client.id);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchLastPurchase = async () => {
            if (clientId !== null) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/purchase/last/${clientId}`, { withCredentials: true });
                    const purchase: Purchase = response.data;
                    setLastPurchaseId(purchase.id);
                    setBusinesses(purchase.purchasedItems.map((item: PurchasedItem) => item.business));
                } catch (error) {
                    console.error('Failed to fetch last purchase:', error);
                }
            }
        };

        fetchLastPurchase();
    }, [clientId]);

    useEffect(() => {
        const fetchCarrier = async () => {
            if (lastPurchaseId !== null) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/delivery/carrierByPurchase/${lastPurchaseId}`, { withCredentials: true });
                    setCarrierId(response.data.id);
                } catch (error) {
                    console.error('Failed to fetch carrier data:', error);
                }
            }
        };

        fetchCarrier();
    }, [lastPurchaseId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (clientId !== null && carrierId !== null && lastPurchaseId !== null && comment) {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
                    clientId,
                    carrierId,
                    purchaseId: lastPurchaseId,
                    description: comment
                }, { withCredentials: true });
                toast.success('Comentario enviado con éxito');
                setComment('');
                setIsCommentSubmitted(true);
            } catch (error) {
                console.error('Error al enviar el comentario:', error);
                toast.error('Error al enviar el comentario');
            }
        } else {
            toast.warn('Por favor, asegúrate de que todos los campos estén llenos');
        }
    };
    
    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (clientId !== null && rating !== null && lastPurchaseId !== null && review) {
            for (const business of businesses) {
                try {
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
                        clientId,
                        businessId: business.id,
                        purchaseId: lastPurchaseId,
                        reviewDate: new Date().toISOString().split('T')[0],
                        mark: rating,
                        description: review
                    }, { withCredentials: true });
                    toast.success(`Reseña enviada con éxito al negocio ${business.name}`);
                } catch (error) {
                    console.error(`Error al enviar la reseña para el negocio ${business.name}:`, error);
                    toast.error(`Error al enviar la reseña para el negocio ${business.name}`);
                }
            }
            setReview('');
            setRating(null);
            setIsReviewSubmitted(true);
        } else {
            toast.warn('Por favor, asegúrate de que todos los campos estén llenos');
        }
    };    


    useEffect(() => {
        const fetchLastCommentAndCompare = async () => {
            if (clientId !== null && lastPurchaseId !== null) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comment/last/${clientId}`, { withCredentials: true });
                    const lastComment = response.data;
                    setLastComment(lastComment);
                    if (lastComment.purchaseId === lastPurchaseId) {
                        setIsCommentSubmitted(true);
                        setIsReviewSubmitted(true);
                    }
                } catch (error) {
                    console.error('Failed to fetch last comment:', error);
                }
            }
        };

        fetchLastCommentAndCompare();
    }, [clientId, lastPurchaseId]);

    useEffect(() => {
        const fetchLastReviewAndCompare = async () => {
            if (clientId !== null && lastPurchaseId !== null) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/last/${clientId}`, { withCredentials: true });
                    const lastReview = response.data;
                    setLastReview(lastReview);
                    if (lastReview.purchaseId === lastPurchaseId) {
                        setIsReviewSubmitted(true);
                    }
                } catch (error) {
                    console.error('Failed to fetch last review:', error);
                }
            }
        };

        fetchLastReviewAndCompare();
    }, [clientId, lastPurchaseId]);


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <ToastContainer />
            {!shouldHideCommentForm() && !isCommentSubmitted && (
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Comente sobre el Repartidor</h2>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows={4}
                        placeholder="Escribe tu comentario aquí..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                    >
                        Enviar Comentario
                    </button>
                </form>
            )}
            {!shouldHideReviewForm() && !isReviewSubmitted && (
                <form onSubmit={handleReviewSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Califique la comida</h2>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows={4}
                        placeholder="Escribe tu reseña aquí..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className="flex justify-center mt-4">
                        <ReactStars
                            count={5}
                            onChange={(newRating) => setRating(newRating)}
                            size={40}
                            activeColor="#ffd700"
                            value={rating !== null ? rating : 0}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                    >
                        Enviar Reseña
                    </button>
                </form>
            )}
            {(shouldHideCommentForm() || isCommentSubmitted) && (shouldHideReviewForm() || isReviewSubmitted) && (
                <p className="mt-6 text-center text-xl">
                    Debes haber realizado una compra o ya has dejado tu comentario o reseña.
                </p>
            )}
        </div>
    );    
    };
    
    export default Page;
    