"use client";
import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosConfig from '@/utils/axiosConfig';
import { Purchase } from '@/types/Purchase';
import { Business } from '@/types/Business';
import { PurchasedItem } from '@/types/PurchasedItem';


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
    const [clientId, setClientId] = useState<number | null>(null)
    const [lastPurchaseId, setLastPurchaseId] = useState<number | null>(null)
    const [lastPurchase, setLastPurchase] = useState<Purchase | null>(null);
    const [businesses, setBusinesses] = useState<Business | null>(null)
    const [carrierId, setCarrierId] = useState<number | null>(null)
    const [comment, setComment] = useState<string>('')
    const [review, setReview] = useState<string>('')
    const [rating, setRating] = useState<number | null>(null)
    const [isCommentSubmitted, setIsCommentSubmitted] = useState<boolean>(false)
    const [isReviewSubmitted, setIsReviewSubmitted] = useState<boolean>(false)
    const [lastComment, setLastComment] = useState<Comment | null>(null)
    const [lastReview, setLastReview] = useState<Review | null>(null)

    const shouldHideCommentForm = () => lastComment !== null && lastComment.purchase.id === lastPurchaseId;
    const shouldHideReviewForm = () => lastReview !== null && lastReview.purchase.id === lastPurchaseId;

    useEffect(() => {
        const fetchUser = async () => {
            await axiosConfig.get(`api/auth/me`)
                .then(r => {
                    setClientId(r.data.client.id)
                    console.log("Esto es la informacion de client" + r.data.client.id)
                })

                .catch(e => { console.error('Failed to fetch user data:', e) })
        };

        fetchUser();
    }, []);


    useEffect(() => {
        const fetchLastPurchase = async () => {
            if (clientId !== null) {
                await axiosConfig.get(`api/purchase/last/${clientId}`)
                    .then(response => {
                        const purchase = response.data;
                        setLastPurchase(purchase)
                        setLastPurchaseId(response.data.id)
                        setBusinesses(response.data.purchasedItems.map((PurchasedItem: { business: Business; }) => PurchasedItem.business))
                    })
                    .catch(e => {
                        console.error('Failed to fetch last purchase:', e)
                    });
            }
        };

        fetchLastPurchase()
    }, [clientId])



    useEffect(() => {
        const fetchCarrier = async () => {
            if (lastPurchaseId !== null) {
                await axiosConfig.get(`api/delivery/carrierByPurchase/${lastPurchaseId}`)
                    .then(response => {
                        setCarrierId(response.data.id)
                    })
                    .catch(error => {
                        console.error('Failed to fetch carrier data:', error)
                    })
            }
        }


        fetchCarrier();
    }, [lastPurchaseId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (clientId !== null && carrierId !== null && lastPurchaseId !== null && comment) {

            await axiosConfig.post(`api/comment`, {
                clientId,
                carrierId,
                purchaseId: lastPurchaseId,
                description: comment
            })
                .then(() => {
                    toast.success('Comentario enviado con éxito')
                    setComment('')
                    setIsCommentSubmitted(true)
                })
                .catch(e => {
                    console.error('Error al enviar el comentario:', e)
                    toast.error('Error al enviar el comentario')
                })
        } else {
            toast.warn('Por favor, asegúrate de que todos los campos estén llenos');
        }
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (clientId !== null && rating !== null && lastPurchaseId !== null && review) {
            if (businesses)
            for (const business of businesses) {
                await axiosConfig.post(`api/review`, {
                    clientId,
                    businessId: business.id,
                    purchaseId: lastPurchaseId,
                    reviewDate: new Date().toISOString().split('T')[0],
                    mark: rating,
                    description: review
                })
                    .then(() => {
                        toast.success(`Reseña enviada con éxito al negocio ${business.name}`);
                    })
                    .catch(e => {
                        console.error(`Error al enviar la reseña para el negocio ${business.name}:`, e);
                        toast.error(`Error al enviar la reseña para el negocio ${business.name}`);
                    })
            }
            setReview('')
            setRating(null)
            setIsReviewSubmitted(true)
        } else {
            toast.warn('Por favor, asegúrate de que todos los campos estén llenos');
        }
    };


    useEffect(() => {
        const fetchLastCommentAndCompare = async () => {
            if (clientId !== null && lastPurchaseId !== null) {

                await axiosConfig.get(`api/comment/last/${clientId}`)
                    .then(response => {
                        const lastComment = response.data
                        setLastComment(lastComment)
                        if (lastComment.purchaseId === lastPurchaseId) {
                            setIsCommentSubmitted(true)
                            setIsReviewSubmitted(true)
                        }
                    })
                    .catch(e => {
                        console.error('Failed to fetch last comment:', e)
                    })
            }
        };

        fetchLastCommentAndCompare();
    }, [clientId, lastPurchaseId]);

    useEffect(() => {
        const fetchLastReviewAndCompare = async () => {
            if (clientId !== null && lastPurchaseId !== null) {
                try {
                    await axiosConfig.get(`api/review/last/${clientId}`)
                        .then(response => {
                            const lastReview = response.data
                            setLastReview(lastReview)
                            if (lastReview.purchaseId === lastPurchaseId) {
                                setIsReviewSubmitted(true)
                            }
                        })
                } catch (error) {
                    console.error('Failed to fetch last review:', error)
                }
            }
        };

        fetchLastReviewAndCompare();
    }, [clientId, lastPurchaseId]);

    console.log("Esto es LastPurchase: ");
    console.log(lastPurchase);
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div>
                <h2 className="text-2xl font-semibold mt-12 mb-4 text-center">Ultima Compra Realizada</h2>
                <div>
                    {lastPurchase?.purchasedItems == null ? (

                        <p className="text-center text-gray-500 p-4">No ha realizado una compra recientemente.</p>
                    ) : (
                        <div className="flex flex-col items-center w-full max-w-4xl p-4">
                            {lastPurchase?.purchasedItems.map((item: PurchasedItem) => (
                                <div key={item.id} className='w-full gap-2 flex flex-cols-2 p-4'>
                                    <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'> Comida </h3>
                                    <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{item.food.name}</h4>
                                    <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'> Local: </h3>
                                    <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{item.business.name}</h4>
                                    <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Cantidad </h3>
                                    <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{item.quantity}</h4>
                                </div>
                            ))}
                            <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Fecha: </h3>
                            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{lastPurchase.creation_date}</h4>
                            <h3 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Total</h3>
                            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{lastPurchase.total_cost}</h4>
                        </div>
                    )}
                </div>
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
        </div>
    );
};

export default Page;
