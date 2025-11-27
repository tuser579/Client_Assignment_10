import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from 'sweetalert2';
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const CarDetails = () => {

    const car = useLoaderData();
    const [carInfo,setCarInfo] = useState(car);
    const { user } = use(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const [bookingData, setBookingData] = useState({
        pickupDate: "",
        returnDate: "",
        customerName: user.displayName,
        customerEmail: user.email
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateTotal = () => {
        if (!bookingData.pickupDate || !bookingData.returnDate) return 0;

        const pickup = new Date(bookingData.pickupDate);
        const returnDate = new Date(bookingData.returnDate);
        const days = Math.ceil((returnDate - pickup) / (1000 * 60 * 60 * 24));
        return days > 0 ? days * car.price : 0;
    };

    const modal = () => {
        // checking unavailable
        if (carInfo.status === 'Unavailable') {
            Swal.fire({
                title: 'Car Unavailable',
                text: `Sorry, the car "${car.name}" is currently not available.`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        setShowModal(true);
    }

    const handleBooking = (e) => {
        e.preventDefault();

        // Validate dates
        if (!bookingData.pickupDate || !bookingData.returnDate) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select both pickup and return dates!',
            });
            return;
        }

        if (new Date(bookingData.pickupDate) >= new Date(bookingData.returnDate)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Dates',
                text: 'Return date must be after pickup date!',
            });
            return;
        }

        // Validate customer information
        if (!bookingData.customerName || !bookingData.customerEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please fill in all customer details!',
            });
            return;
        }

        const totalDays = Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = totalDays * car.price;

        // Show SweetAlert2 confirmation
        Swal.fire({
            title: 'Confirm Your Booking',
            html: `
                <div class="text-left">
                    <p><strong>Car:</strong> ${car.name}</p>
                    <p><strong>Pickup Date:</strong> ${new Date(bookingData.pickupDate).toLocaleDateString()}</p>
                    <p><strong>Return Date:</strong> ${new Date(bookingData.returnDate).toLocaleDateString()}</p>
                    <p><strong>Total Days:</strong> ${totalDays}</p>
                    <p><strong>Total Price:</strong> $${totalPrice}</p>
                    <p><strong>Customer:</strong> ${bookingData.customerName}</p>
                    <p><strong>Email:</strong> ${bookingData.customerEmail}</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Confirm Booking',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const bookingInfo = {
                        ...bookingData,
                        carId: car._id,
                        carImage: car.image,
                        carName: car.name,
                        totalDays,
                        totalPrice,
                        bookingDate: new Date().toISOString(),
                    };

                    const carData = {
                        status: "Unavailable"
                    };

                    // status changed
                    fetch(`http://localhost:2005/carsBooking/${car._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(carData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount) {
                                carInfo.status = "Unavailable";
                                setCarInfo(carInfo);
                            }
                        });

                    // POST to backend
                    fetch("http://localhost:2005/myBookings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bookingInfo),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log("Booking saved:", data);

                            Swal.fire({
                                title: 'Booking Confirmed!',
                                html: `
                <div class="text-center">
                    <p class="text-green-600 font-semibold">Your booking has been confirmed!</p>
                </div>
            `,
                                icon: 'success',
                                confirmButtonColor: '#16a34a',
                                confirmButtonText: 'Great!'
                            });

                            // Reset form and close modal
                            setBookingData({
                                pickupDate: "",
                                returnDate: "",
                                customerName: "",
                                customerEmail: ""
                            });
                            setShowModal(false);
                        })
                        .catch(err => {
                            console.error("Error saving booking:", err);
                            Swal.fire({
                                icon: 'error',
                                title: 'Save Failed',
                                text: 'Could not save booking to database!',
                            });
                        });
                }

            });
    }

    const minReturnDate = bookingData.pickupDate
        ? new Date(new Date(bookingData.pickupDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : "";

    const totalPrice = calculateTotal();
    const totalDays = totalPrice / car.price;

    return (
        // <div className='w-full sm:w-[70%] mx-auto p-5 bg-white shadow-lg rounded-lg'>
        //     <div>
        //         {/* car image */}
        //         <img
        //             src={car.image}
        //             alt={car.name}
        //             className="w-120 mx-auto object-cover rounded-md mb-6"
        //         />

        //         {/* car info */}
        //         <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
        //         <p className="text-gray-700 mb-4"><span className="font-semibold">Description:</span> {car.description}</p>

        //         <div className="grid grid-cols-2 gap-4 mb-6">
        //             <p><span className="font-semibold">Category:</span> {car.category}</p>
        //             <p><span className="font-semibold">Rent Price:</span> ${car.price}/day</p>
        //             <p><span className="font-semibold">Location:</span> {car.location}</p>
        //             <p><span className="font-semibold">Status:</span> {car.status}</p>
        //         </div>

        //         {/* provider info */}
        //         <div className="bg-gray-100 rounded-md mb-6">
        //             <h2 className="text-xl font-semibold mb-2">Provider Information :</h2>
        //             <p><span className="font-semibold">Name:</span> {car.providerName}</p>
        //             <p><span className="font-semibold">Email:</span> {car.email}</p>
        //         </div>

        //         {/* book now button */}
        //         <button
        //             onClick={modal}
        //             className="btn btn-primary w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 border-none text-lg font-semibold"
        //         >
        //             Book Now
        //         </button>
        //     </div>

        //     {/* DaisyUI Modal */}
        //     <dialog className={`modal ${showModal ? 'modal-open' : ''}`}>
        //         <div className="modal-box">
        //             <div className="flex justify-between items-center mb-6">
        //                 <h3 className="text-2xl font-bold">Book {car.name}</h3>
        //                 <button
        //                     onClick={() => setShowModal(false)}
        //                     className="btn btn-sm btn-circle btn-ghost"
        //                 >
        //                     ✕
        //                 </button>
        //             </div>

        //             <form onSubmit={handleBooking} className="space-y-6">
        //                 {/* Customer Information */}
        //                 <div className="space-y-4">
        //                     <h4 className="font-semibold text-lg border-b pb-2">Your Information</h4>

        //                     <div className="form-control">
        //                         <label className="label">
        //                             <span className="label-text font-semibold">Full Name *</span>
        //                         </label>
        //                         <input
        //                             type="text"
        //                             name="customerName"
        //                             defaultValue={user.displayName}
        //                             onChange={handleInputChange}
        //                             required
        //                             className="input input-bordered w-full focus:input-primary"
        //                             placeholder="Enter your full name"
        //                         />
        //                     </div>

        //                     <div className="form-control">
        //                         <label className="label">
        //                             <span className="label-text font-semibold">Email *</span>
        //                         </label>
        //                         <input
        //                             type="email"
        //                             name="customerEmail"
        //                             defaultValue={user.email}
        //                             onChange={handleInputChange}
        //                             required
        //                             className="input input-bordered w-full focus:input-primary"
        //                             placeholder="Enter your email"
        //                         />
        //                     </div>

        //                 </div>

        //                 {/* Booking Dates */}
        //                 <div className="space-y-4">
        //                     <h4 className="font-semibold text-lg border-b pb-2">Booking Dates</h4>

        //                     <div className="form-control">
        //                         <label className="label">
        //                             <span className="label-text font-semibold">Pickup Date *</span>
        //                         </label>
        //                         <input
        //                             type="date"
        //                             name="pickupDate"
        //                             value={bookingData.pickupDate}
        //                             onChange={handleInputChange}
        //                             min={new Date().toISOString().split('T')[0]}
        //                             required
        //                             className="input input-bordered w-full focus:input-primary"
        //                         />
        //                     </div>

        //                     <div className="form-control">
        //                         <label className="label">
        //                             <span className="label-text font-semibold">Return Date *</span>
        //                         </label>
        //                         <input
        //                             type="date"
        //                             name="returnDate"
        //                             value={bookingData.returnDate}
        //                             onChange={handleInputChange}
        //                             min={minReturnDate}
        //                             required
        //                             className="input input-bordered w-full focus:input-primary"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Price Summary */}
        //                 {totalPrice > 0 && (
        //                     <div className="alert alert-success bg-green-50 border-green-200">
        //                         <div>
        //                             <h3 className="font-bold text-green-800">Booking Summary</h3>
        //                             <div className="text-green-700 mt-2">
        //                                 <p>Total days: {totalDays}</p>
        //                                 <p className="font-semibold text-lg">Total price: ${totalPrice}</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )}

        //                 <div className="modal-action">
        //                     <button
        //                         type="button"
        //                         onClick={() => setShowModal(false)}
        //                         className="btn btn-ghost"
        //                     >
        //                         Cancel
        //                     </button>
        //                     <button
        //                         type="submit"
        //                         className="btn btn-primary bg-red-500 text-white border-none hover:bg-red-600"
        //                     >
        //                         Confirm Booking
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>

        //         {/* Modal backdrop */}
        //         <form method="dialog" className="modal-backdrop">
        //             <button onClick={() => setShowModal(false)}>close</button>
        //         </form>
        //     </dialog>
        // </div>
        <div className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}>
            <div className="min-h-screen  sm:py-8">
                <div className="w-full max-w-6xl mx-auto sm:p-4">
                    {/* Main Card */}
                    <div className="bg-white/95 backdrop-blur-md sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                        {/* Header Section with linear */}
                        <div className="bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 p-8 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative z-10">
                                <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
                                <p className="text-blue-200 text-lg">{car.category} • {car.location}</p>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                    <span className="text-white font-semibold">${car.price}/day</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Image */}
                                <div className="space-y-6">
                                    <div className="relative group">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                                            <div className="text-2xl font-bold text-blue-600">${car.price}</div>
                                            <div className="text-sm text-blue-800 font-medium">Per Day</div>
                                        </div>
                                        <div className="bg-linear-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                                            <div
                                                className={`text-2xl font-bold ${car.status === 'Available' ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            >
                                                {car.status}
                                            </div>

                                            <div
                                                className={`text-sm font-medium py-1 rounded-md ${car.status === 'Available' ? 'text-green-400' : 'text-red-400'
                                                    }`}
                                            >
                                                Availability
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Details */}
                                <div className="space-y-6">
                                    {/* Description */}
                                    <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Description
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">{car.description}</p>
                                    </div>

                                    {/* Car Details Grid */}
                                    <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Car Details
                                        </h3>
                                        <div className="">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                                    <span className="font-semibold text-gray-600">Category</span>
                                                    <span className="font-medium text-gray-800">{car.category}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                                    <span className="font-semibold text-gray-600">Location</span>
                                                    <span className="font-medium text-gray-800">{car.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Provider Information */}
                                    <div className="bg-linear-to-br from-indigo-50 to-purple-100 rounded-2xl p-6 border border-indigo-200">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Provider Information
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center py-2">
                                                <span className="font-semibold text-gray-600">Name</span>
                                                <span className="font-medium text-gray-800">{car.providerName}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="font-semibold text-gray-600">Email</span>
                                                <span className="font-medium text-blue-600">{car.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Book Now Button */}
                                    <button
                                        onClick={modal}
                                        className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center group"
                                    >
                                        <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Book This Car Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DaisyUI Modal - Enhanced */}
            <dialog className={`modal ${showModal ? 'modal-open' : ''}`}>
                <div className="modal-box max-w-2xl bg-linear-to-br from-white to-gray-50 border border-gray-200 shadow-2xl">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">Book {car.name}</h3>
                            <p className="text-gray-600 mt-1">Complete your booking details</p>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-6">
                        {/* Customer Information */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-lg text-gray-800 border-l-4 border-blue-500 pl-3">Your Information</h4>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-700">Full Name *</span>
                                </label>
                                <input
                                    type="text"
                                    name="customerName"
                                    defaultValue={user.displayName}
                                    onChange={handleInputChange}
                                    required
                                    className="input input-bordered w-full focus:input-primary bg-white/80 backdrop-blur-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-700">Email *</span>
                                </label>
                                <input
                                    type="email"
                                    name="customerEmail"
                                    defaultValue={user.email}
                                    onChange={handleInputChange}
                                    required
                                    className="input input-bordered w-full focus:input-primary bg-white/80 backdrop-blur-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Booking Dates */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-lg text-gray-800 border-l-4 border-green-500 pl-3">Booking Dates</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-700">Pickup Date *</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="pickupDate"
                                        value={bookingData.pickupDate}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="input input-bordered w-full focus:input-primary bg-white/80 backdrop-blur-sm"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-700">Return Date *</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="returnDate"
                                        value={bookingData.returnDate}
                                        onChange={handleInputChange}
                                        min={minReturnDate}
                                        required
                                        className="input input-bordered w-full focus:input-primary bg-white/80 backdrop-blur-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price Summary */}
                        {totalPrice > 0 && (
                            <div className="bg-linear-to-r from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-green-800 text-lg">Booking Summary</h3>
                                        <div className="text-green-700 mt-2 space-y-1">
                                            <p className="flex justify-between">
                                                <span>Total days:</span>
                                                <span className="font-semibold">{totalDays}</span>
                                            </p>
                                            <p className="flex justify-between text-xl">
                                                <span>Total price:</span>
                                                <span className="font-bold">${totalPrice}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-3xl">🚗</div>
                                </div>
                            </div>
                        )}

                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="btn btn-ghost hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary bg-linear-to-r from-red-500 to-red-600 border-none hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>

                {/* Modal backdrop */}
                <form method="dialog" className="modal-backdrop bg-black/60 backdrop-blur-sm">
                    <button onClick={() => setShowModal(false)}>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default CarDetails;