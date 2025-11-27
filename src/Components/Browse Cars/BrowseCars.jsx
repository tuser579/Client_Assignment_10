import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BrowseCars = () => {

    const cars = useLoaderData();

    return (
        //  Featured Cars Section 
        <div className="bg-white pb-20" >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-10 mb-4">
                        Featured Cars
                    </h2>
                    <p className="text-gray-600 text-lg">
                        All the cars you choose
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <motion.div
                            key={car._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0,0,0,0.2)" }}
                        >
                            <div className="h-48 flex items-center justify-center relative">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                    data-tooltip-id={`tooltip-${car.name}`}
                                    data-tooltip-content={`Price: $${car.price}/day`}
                                />
                                <div
                                    className={`absolute top-4 right-4 ${car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                                        } text-white px-3 py-1 rounded-full text-sm font-semibold`}
                                >
                                    {car.status}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {car.name}
                                    </h3>
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${car.price}
                                        <span className="text-sm text-gray-500">/day</span>
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600 mb-4">
                                    <span className="text-green-500 bg-gray-200 border rounded-2xl font-semibold px-1 py-0.5">{car.category}</span>
                                    <span className="text-sm">By {car.providerName}</span>
                                </div>
                                <Link to={`/car/${car['_id']}`}>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 font-semibold">
                                        View Details
                                    </button>
                                </Link>
                                {/* Tooltip Component */}
                                <Tooltip id={`tooltip-${car.name}`} place="top" effect="solid" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default BrowseCars;