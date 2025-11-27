import React, { useState, useEffect, use } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const CarCard = ({ cars }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [allCars, setAllCars] = useState('');
    const [filteredCars, setFilteredCars] = useState(cars);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const { user } = use(AuthContext);

    useEffect(() => {
            fetch(`http://localhost:2005/cars`)
                .then(res => res.json())
                .then(data => {
                    setAllCars(data);
                })
        }, [user?.email]);
    

    // Filter cars based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredCars(cars);
            setShowSearchResults(false);
        } else {
            const filtered = allCars.filter(car =>
                car.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCars(filtered);
            setShowSearchResults(true);
        }
    }, [searchTerm, cars, allCars]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setShowSearchResults(false);
    };

    return (
        // Newest Cars Section 
        <div className="bg-white pb-20">
            <div className="container mx-auto px-4">
                {/* Search Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-4 hover:shadow-xl transition-shadow duration-300">
                            <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search cars by name..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-lg text-gray-700 placeholder-gray-400"
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        
                        {/* Search Results Info */}
                        {showSearchResults && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full left-0 right-0 bg-white mt-2 rounded-2xl shadow-xl border border-gray-200 p-4 z-10"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-gray-700 font-semibold">
                                        Search Results ({filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found)
                                    </p>
                                    <button
                                        onClick={clearSearch}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                                {filteredCars.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">
                                        No cars found matching "<span className="font-semibold">{searchTerm}</span>"
                                    </p>
                                ) : (
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {filteredCars.slice(0, 5).map(car => (
                                            <div
                                                key={car._id}
                                                className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                                onClick={() => navigate(`/car/${car._id}`)}
                                            >
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="w-12 h-12 rounded-lg mr-4"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">{car.name}</p>
                                                    <p className="text-sm text-gray-600">${car.price}/day • {car.category}</p>
                                                </div>
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    car.status === 'Available' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {car.status}
                                                </div>
                                            </div>
                                        ))}
                                        {filteredCars.length > 5 && (
                                            <div className="text-center pt-2 border-t border-gray-200">
                                                <p className="text-sm text-gray-500">
                                                    And {filteredCars.length - 5} more cars...
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {showSearchResults ? 'Search Results' : 'Newest Cars'}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {showSearchResults 
                            ? `Found ${filteredCars.length} ${filteredCars.length === 1 ? 'car' : 'cars'} matching "${searchTerm}"`
                            : 'Discover our newest additions to the fleet'
                        }
                    </p>
                </div>

                {/* Cars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCars.map((car) => (
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
                                    className={`absolute top-4 right-4 ${
                                        car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
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
                                    <span className="text-green-500 bg-gray-200 border rounded-2xl font-semibold px-1 py-0.5">
                                        {car.category}
                                    </span>
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

                {/* No Results Message */}
                {showSearchResults && filteredCars.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Cars Found</h3>
                        <p className="text-gray-600 mb-6">
                            We couldn't find any cars matching "<span className="font-semibold">{searchTerm}</span>"
                        </p>
                        <button
                            onClick={clearSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                        >
                            Clear Search
                        </button>
                    </motion.div>
                )}

                {/* View All Cars Button - Only show when not searching */}
                {!showSearchResults && (
                    <div className="text-center mt-12">
                        <button 
                            onClick={() => navigate('/browseCars')} 
                            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                        >
                            View All Cars
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarCard;