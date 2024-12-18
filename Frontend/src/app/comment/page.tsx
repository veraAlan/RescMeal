"use client";
import React, { useState, useEffect } from 'react';
import axiosConfig from '../../utils/axiosConfig';
import StarRatings from 'react-star-ratings';
import { FaMotorcycle, FaStore } from 'react-icons/fa';

const CommentPage = () => {
    const [clientId, setClientId] = useState(null);
    const [highestPurchaseId, setHighestPurchaseId] = useState(null);
    const [purchaseDetails, setPurchaseDetails] = useState(null);
    const [businessIds, setBusinessIds] = useState([]);
    const [deliveryDetails, setDeliveryDetails] = useState(null);
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState(null);
    const [reviewDescription, setReviewDescription] = useState('');
    const [mark, setMark] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosConfig.get('/api/auth/me');
                setClientId(response.data.client.id);
                fetchPurchases(response.data.client.id);
            } catch (e) {
                console.error('Failed to fetch user data:', e);
            }
        };

        const fetchPurchases = async (clientId) => {
            try {
                const response = await axiosConfig.get(`/api/purchase/client/${clientId}`);
                const highestId = Math.max(...response.data.map(purchase => purchase.id));
                setHighestPurchaseId(highestId);
                fetchPurchaseDetails(highestId);
                fetchDeliveryDetails(highestId);
                fetchComment(clientId, highestId);
                fetchReviews(highestId);
            } catch (error) {
                console.error('Failed to fetch purchases:', error);
            }
        };

        const fetchPurchaseDetails = async (purchaseId) => {
            try {
                const response = await axiosConfig.get(`/api/purchase/${purchaseId}`);
                setPurchaseDetails(response.data);
                const businessIds = response.data.purchasedItems.map(item => item.business.id);
                setBusinessIds(businessIds);
            } catch (error) {
                console.error('Failed to fetch purchase details:', error);
            }
        };

        const fetchDeliveryDetails = async (purchaseId) => {
            try {
                const response = await axiosConfig.get(`/api/delivery/carrierByPurchase/${purchaseId}`);
                setDeliveryDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch delivery details:', error);
            }
        };

        const fetchComment = async (clientId, purchaseId) => {
            try {
                const response = await axiosConfig.get(`/api/comment/last/${clientId}`);
                if (response.data.purchase.id === purchaseId) {
                    setComment(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch comment:', error);
            }
        };

        const fetchReviews = async (purchaseId) => {
            try {
                const response = await axiosConfig.get(`/api/review/purchase/${purchaseId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        };

        fetchUser();
    }, []);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (isCommentSubmitting) return;
        setIsCommentSubmitting(true);

        try {
            const payload = {
                clientId,
                carrierId: deliveryDetails.id,
                purchaseId: highestPurchaseId,
                description
            };
            const response = await axiosConfig.post('/api/comment', payload);
            setComment(response.data);
        } catch (error) {
            console.error('Failed to create comments:', error);
        } finally {
            setIsCommentSubmitting(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const uniqueBusinessIds = [...new Set(businessIds)]; // Eliminar duplicados

            const promises = uniqueBusinessIds.map(async (businessId) => {
                const payload = {
                    clientId,
                    businessId,
                    purchaseId: highestPurchaseId,
                    description: reviewDescription,
                    mark
                };
                return axiosConfig.post('/api/review', payload);
            });

            const responses = await Promise.all(promises);
            setReviews(responses.map(response => response.data));
        } catch (error) {
            console.error('Failed to create reviews:', error);
        }
    };

    const handleStarClick = (newRating) => {
        setMark(newRating);
    };

    if (!clientId || !highestPurchaseId || !purchaseDetails || !deliveryDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-16 mb-8 p-4 sm:p-8 bg-white shadow-xl rounded-xl max-w-screen-lg">
            <div className="mb-4">
                {comment && (
                    <div className="mt-8 flex justify-center">
                        <div className="w-full max-w-3xl border border-gray-300 rounded-lg p-4 mb-4">
                            <h3 className="font-semibold text-lg text-left p-2 mb-4 border-b border-gray-300">Comentario Existente</h3>
                            <div className="flex flex-col items-start overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 bg-green-100 p-8 rounded-lg">
                                <FaMotorcycle className="inline ml-2 text-gray-500" />
                                <p><strong>Descripción:</strong> {comment.description}</p>
                                <p><strong>Carrier:</strong> {comment.carrier.name} {comment.carrier.last_name}</p>
                                <p><strong>Artículos Comprados:</strong></p>
                                <ul>
                                    {comment.purchase.purchasedItems.map((item, index) => (
                                        <li key={index} className="ml-4 list-disc">{item.food.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                {reviews.length > 0 && (
                    <div className="mt-8 flex flex-wrap justify-center">
                        <div className="w-full max-w-3xl border border-gray-300 rounded-lg p-4 mb-4">
                            <h3 className="font-semibold text-lg text-left p-2 mb-4 border-b border-gray-300">Comentario Existente</h3>
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-start overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 p-8 rounded-lg m-2 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}
                                    style={{ flex: '0 1 calc(50% - 1em)' }}
                                >
                                    <h3 className="font-semibold text-lg mb-4"><FaStore className="inline ml-2 text-gray-500" /></h3>
                                    <p><strong>Descripción:</strong> {review.description}</p>
                                    <p><strong>Calificación:</strong> {review.mark}</p>
                                    <p><strong>Nombre del Local:</strong> {review.business.name}</p>
                                    <p><strong>Comida Comprada:</strong></p>
                                    <ul>
                                        {review.purchase.purchasedItems.map((item, idx) => (
                                            <li key={idx} className="ml-4 list-disc">{item.food.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-between w-full">
                {!comment && (
                    <div className="w-full sm:w-1/2 p-4">
                        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4 shadow-lg h-full flex flex-col items-center">
                            <h2 className="text-xl font-semibold">Comente sobre el Repartidor</h2>
                            <form onSubmit={handleSubmitComment} className="w-full flex flex-col items-center">
                                <div className="mb-4 w-full"><br />
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={isCommentSubmitting}
                                >
                                    {isCommentSubmitting ? 'Enviando...' : 'Enviar'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {reviews.length === 0 && (
                    <div className="w-full sm:w-1/2 p-4">
                        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4 shadow-lg h-full flex flex-col items-center">
                            <h2 className="text-xl font-semibold">Califique los Negocios</h2>
                            <form onSubmit={handleReviewSubmit} className="w-full flex flex-col items-center">
                                <div className="mb-4 w-full">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reviewDescription">
                                        Descripción
                                    </label>
                                    <textarea
                                        id="reviewDescription"
                                        value={reviewDescription}
                                        onChange={(e) => setReviewDescription(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4 w-full">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mark">
                                        Calificación
                                    </label>
                                    <StarRatings
                                        rating={mark}
                                        starRatedColor="blue"
                                        changeRating={handleStarClick}
                                        numberOfStars={5}
                                        name="rating"
                                        starDimension="30px"
                                        starSpacing="5px"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentPage;