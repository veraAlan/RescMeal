import React from 'react';
import Map from '@/components/Map/Map';
import StarRatings from 'react-star-ratings';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Business = ({ business, foods, reviews, normalizeDate, normalizePhone }) => {

    const FoodCard = ({ food }) => (
        <div key={food.id} className="flex flex-col items-center w-full max-w-sm overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 bg-white mb-4 sm:mb-6 lg:mb-8 mx-auto min-h-[300px] p-4 sm:p-6 lg:p-8 rounded-lg">
            <img className="w-32 h-32 object-cover mb-4 rounded-lg" src={food.image} alt={food.name} />
            <div className="flex flex-col justify-between leading-normal flex-grow text-center">
                <div>
                    <div className="text-black font-bold text-xl sm:text-2xl mb-2">{food.name}</div>
                    <p className="text-black text-lg sm:text-base lg:text-lg">{food.description}</p>
                </div>
                <div className="text-black text-md mt-4 space-y-1">
                    <p><span className="font-semibold">Categoría: </span>{food.category}</p>
                    <p><span className="font-semibold">Cantidad: </span>{food.quantity}</p>
                    <p><span className="font-semibold">Fecha de Expiración: </span>{normalizeDate(food.expiration_date)}</p>
                    <p><span className="font-semibold">Fecha de Producción: </span>{normalizeDate(food.production_date)}</p>
                </div>
                <div className="mt-6 flex justify-between items-center w-full">
                    <span className="text-black text-xl sm:text-lg lg:text-xl line-through">${(food.price * 2).toFixed(2)}</span>
                    <span className="text-black font-bold text-2xl sm:text-3xl ml-2">${food.price}</span>
                </div>
            </div>
        </div>
    );

    const ReviewCard = ({ review }) => (
        <div key={review.id} className="flex flex-wrap p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg bg-white items-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col items-center col-span-1">
                    <FaUserCircle className="text-blue-500 text-4xl sm:text-5xl lg:text-6xl" /> {/* Cambié el color a azul */}
                    <div className="text-black text-sm font-bold mt-2">{review.client.name} {review.client.last_name}</div>
                </div>
                <div className="flex flex-col justify-center col-span-1">
                    <div className="text-black text-lg sm:text-base lg:text-lg">{review.description}</div>
                </div>
                <div className="flex flex-col justify-center col-span-1">
                    <div className="text-black font-bold text-md sm:text-base lg:text-md text-center">Puntuación
                        <div className="flex flex-col mt-2">
                            <StarRatings
                                rating={review.mark}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="2px"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center col-span-1">
                    <div className="text-gray-600 text-sm text-center">Fecha: {normalizeDate(review.review_date)}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 mt-8 sm:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
                <div className="lg:col-span-2 bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col space-y-4 justify-center">
                    <div className="flex flex-wrap items-center space-x-4">
                        <div className="w-full sm:w-64 h-64 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-300 mb-4 sm:mb-0">
                            <img
                                className="w-full h-full object-cover"
                                src={`/Business/${business.image}`}
                                alt={business.name}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className="flex flex-col justify-center text-left text-black w-full sm:w-auto">
                            <h3 className="text-lg sm:text-xl lg:text-2xl mb-2">Información del {business.name}</h3>
                            <h3 className="text-lg sm:text-xl lg:text-2xl mb-2">Celular: {normalizePhone(business.phone)}</h3>
                            <h3 className="text-lg sm:text-xl lg:text-2xl mb-2">Horario: {business.schedule}</h3>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg lg:rounded-tr-lg lg:rounded-br-lg text-center">
                    <Map id={business.id} />
                </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
                <h3 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-center text-black mb-4'>Comidas del {business.name}</h3>
                {!foods || foods.length === 0 ? (
                    <div className="text-center">No hay comidas disponibles</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {foods.map(food => (
                            <FoodCard key={food.id} food={food} />
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
                <h3 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-center text-black mb-4'>Reseñas del {business.name}</h3>
                {reviews.length === 0 ? (
                    <div className="text-center">No hay reseñas disponibles</div>
                ) : (
                    <div className="space-y-4">
                        {reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Business;