"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaUserCircle, FaCar, FaMotorcycle } from 'react-icons/fa';
import axiosConfig from '../../../utils/axiosConfig';

const CarrierPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [carrierData, setCarrierData] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchCarrierData = async () => {
            try {
                console.log(`Fetching data for carrier ID: ${id}`);
                const response = await axiosConfig.get(`/api/carrier/${id}`);
                console.log('API Response:', response);

                const data = response.data;
                console.log('Carrier data:', data);
                setCarrierData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching carrier data:', error);
                setError('Failed to fetch carrier data');
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axiosConfig.get(`/api/comment/commentsCarrier/${id}`);
                const commentList = response.data._embedded.commentList;
                setComments(commentList);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Failed to fetch comments');
            }
        };

        if (id) {
            fetchCarrierData();
            fetchComments();
        }
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    }

    const CommentCard = ({ comment }) => (
        <div key={comment.id} className="flex flex-wrap p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg bg-white items-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col items-center col-span-1">
                    <FaUserCircle className="text-blue-500 text-4xl sm:text-5xl lg:text-6xl" />
                    <div className="text-black text-sm font-bold mt-2">{comment.client.name} {comment.client.last_name}</div>
                </div>
                <div className="flex flex-col justify-center col-span-3">
                    <div className="text-black text-lg sm:text-base lg:text-lg">{comment.description}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 mt-8 sm:mt-16">



            <div>
                <div className="lg:col-span-2 bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg flex flex-wrap items-center">
                    <div className="w-full sm:w-1/3 lg:w-1/4 h-64 rounded-lg overflow-hidden border-2 border-gray-300 mb-4 sm:mb-0 flex items-center justify-center">
                        {carrierData.vehicle_type === 'Car' ? (
                            <FaCar className="text-blue-500 text-6xl sm:text-7xl lg:text-8xl" />
                        ) : (
                            <FaMotorcycle className="text-blue-500 text-6xl sm:text-7xl lg:text-8xl" />
                        )}
                    </div>
                    <div className="w-full sm:w-2/3 lg:w-3/4 flex flex-col justify-center text-left text-black pl-12 pr-12">
                        <h3 className="text-lg sm:text-xl lg:text-2xl mb-2">Información del Carrier</h3>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-2"><strong>Nombre:</strong> {carrierData.name}</p>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-2"><strong>Apellido:</strong> {carrierData.last_name}</p>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-2"><strong>Tipo de Vehículo:</strong> {carrierData.vehicle_type}</p>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-2"><strong>Teléfono:</strong> {carrierData.phone}</p>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-2"><strong>Fecha de Nacimiento:</strong> {carrierData.birthdate}</p>
                        <div className="flex justify-center mt-4">
                            <a href="/auth/me">
                                <button className="rounded-lg px-6 py-2 font-bold bg-gray-200 text-gray-900 hover:bg-gray-300 transition duration-300">Volver Atrás</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="p-4 sm:p-6 lg:p-8">
                <h3 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-center text-black mb-4'>Comentarios del Carrier</h3>
                {comments.length === 0 ? (
                    <div className="text-center">No hay comentarios disponibles</div>
                ) : (
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarrierPage;