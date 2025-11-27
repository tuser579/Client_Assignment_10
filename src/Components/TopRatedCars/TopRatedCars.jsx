import React, { use } from 'react';
import { Link, useNavigate } from 'react-router';

const TopRatedCars = ({topRatedCars}) => {

    const topCars = use(topRatedCars);
    const navigate = useNavigate();

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Top Rated Cars
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover our most popular and highly-rated vehicles chosen by thousands of satisfied customers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topCars.map((car) => (
                        <div key={car._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="relative overflow-hidden">
                                <img 
                                    src={car.image} 
                                    alt={car.name}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {car.rating} ★
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                                    <span className="text-2xl font-bold text-blue-600">${car.price}<span className='text-[1rem] text-gray-600'>/day</span>
                                    </span>
                                </div>
                                
                                <span className="text-green-500 bg-gray-200 border rounded-2xl font-semibold px-1 py-0.5 mb-4">{car.category}</span>
                                
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(Math.floor(car.rating))}
                                        <span className="text-gray-300">{"★".repeat(5 - Math.floor(car.rating))}</span>
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500">({car.reviews} reviews)</span>
                                </div>

                                <button onClick={() => navigate(`/car/${car['_id']}`)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-1">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TopRatedCars;