import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
// import axios from "axios";
// import useAxios from "../../../hooks/useAxiox";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();


    // useEffect(() => {
    //    axios.get(`https://server-api-assign10.vercel.app/myBookings?email=${user.email}`)
    //    .then(data => {
    //     //   console.log(data);
    //     setBookings(data.data);
    //    })
    // }, [user.email]);

    useEffect(() => {
       axiosSecure.get(`/myBookings?email=${user.email}`)
    //    axiosSecure.get(`/myBookings?email=a@gmail.com`)
       .then(data => {
        //   console.log(data);
        setBookings(data.data);
       })
    }, [user,axiosSecure]);

    // useEffect(() => {
    //     fetch(`https://server-api-assign10.vercel.app/myBookings?email=${user.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setBookings(data);
    //         })
    // }, [user.email]);

    const handleDelete = (id, carId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // fetch(`https://server-api-assign10.vercel.app/myBookings/${id}`, {
                //     method: 'DELETE'
                // })
                //     .then(res => res.json())
                axiosSecure.delete(`/myBookings/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your car has been deleted.",
                                icon: "success"
                            });

                            const carData = {
                                status: "Available"
                            };

                            // status changed
                            // fetch(`https://server-api-assign10.vercel.app/carsBooking/${carId}`, {
                            //     method: 'PATCH',
                            //     headers: {
                            //         'Content-Type': 'application/json',
                            //     },
                            //     body: JSON.stringify(carData)
                            // })
                            //     .then(res => res.json())
                            axiosSecure.patch(`/carsBooking/${carId}` , carData)
                                .then(data => {
                                    if (data.data.modifiedCount) {
                                        setBookings(bookings.filter((booking) => booking._id !== id));
                                    }
                                });
                        }
                    })
            }
        });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Booking History
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Track and manage all your car rental bookings in one place
                    </p>
                    <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Stats Overview */}
                <div className="w-70 mx-auto mb-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Grid */}
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                        >
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                    {/* Car Image and Basic Info */}
                                    <div className="flex items-start space-x-4 flex-1">
                                        <div className="relative">
                                            <img
                                                src={booking.carImage}
                                                alt={booking.carName}
                                                className="w-30 h-27 rounded-xl  shadow-md group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {booking.carName}
                                            </h3>

                                            {/* Date Cards */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                                    <p className="text-xs font-medium text-blue-700 uppercase tracking-wide">Pickup</p>
                                                    <p className="text-sm font-semibold text-gray-900 mt-1">
                                                        {new Date(booking.pickupDate).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                                    <p className="text-xs font-medium text-green-700 uppercase tracking-wide">Return</p>
                                                    <p className="text-sm font-semibold text-gray-900 mt-1">
                                                        {new Date(booking.returnDate).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                                    <p className="text-xs font-medium text-purple-700 uppercase tracking-wide">Booked On</p>
                                                    <p className="text-sm font-semibold text-gray-900 mt-1">
                                                        {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-9">
                                        <button
                                            onClick={() => handleDelete(booking._id, booking.carId)}
                                            className="inline-flex items-center px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 hover:scale-105 shadow-sm group/delete"
                                        >
                                            <svg className="w-4 h-4 mr-2 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Duration: {Math.ceil((new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24))} days
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {bookings?.length === 0 && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 bg-linear-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No bookings yet</h3>
                                <p className="text-gray-600 mb-6">
                                    You haven't made any car rentals yet. Start exploring our fleet to book your first vehicle.
                                </p>
                                <button onClick={() => navigate('/browseCars')} className="inline-flex items-center px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Browse Cars
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
