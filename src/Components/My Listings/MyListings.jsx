import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function MyListings() {
    const { user } = use(AuthContext);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null); // Track which car is being updated
    const updateModalRef = useRef(null);
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    

    // Fetch cars added by the logged-in provider
    // useEffect(() => {
    //     fetch(`https://server-api-assign10.vercel.app/myCars?email=${user.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setCars(data);
    //         })
    // }, [user.email]);

     useEffect(() => {
        if (user?.email) {
            // fetch(`https://server-api-assign10.vercel.app/myCars?email=${user.email}`, {
            //     headers: {
            //         authorization: `Bearer ${user.accessToken}`
            //     }
            // })
            //     .then(res => res.json())
            axiosSecure.get(`/myCars?email=${user.email}`)
                .then(data => {
                    // console.log(data);
                    setCars(data.data)
                })
        }
    }, [user,axiosSecure])

    const handleDelete = (id) => {
        //  Block deletion if car is unavailable
        const carToDelete = cars.find(car => car._id === id);
        if (carToDelete && carToDelete.status === "Unavailable") {
            Swal.fire({
                title: "Unavailable!",
                text: `The car "${carToDelete.name}" is currently unavailable and cannot be deleted.`,
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }

        //  Normal delete flow
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
                // fetch(`https://server-api-assign10.vercel.app/cars/${id}`, {
                //     method: "DELETE"
                // })
                //     .then(res => res.json())
                axiosSecure.delete(`/cars/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your car has been deleted.",
                                icon: "success"
                            });
                            const remainingCars = cars.filter(car => car._id !== id);
                            setCars(remainingCars);
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting car:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete car.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleUpdateModalOpen = (car) => {
        setSelectedCar(car);

        if (selectedCar.status === "Unavailable") {
            Swal.fire({
                title: "Unavailable!",
                text: `The car "${selectedCar.name}" is currently unavailable and cannot be updated.`,
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }
        updateModalRef.current.showModal();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!selectedCar) return;

        const form = e.target;
        const carData = {
            name: form.name.value,
            description: form.description.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            location: form.location.value,
            image: form.image.value,
            status: "Available" // always set to Available when updating
        };

        // fetch(`https://server-api-assign10.vercel.app/cars/${selectedCar._id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(carData),
        // })
        //     .then((res) => res.json())
        axiosSecure.patch(`/cars/${selectedCar._id}` , carData)
            .then((data) => {
                if (data.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Car information has been updated.",
                        icon: "success",
                        confirmButtonText: "Great!"
                    });

                    // Update the cars state with the updated car
                    const updatedCars = cars.map((car) =>
                        car._id === selectedCar._id ? { ...car, ...carData } : car
                    );
                    setCars(updatedCars);

                    // Close the modal
                    updateModalRef.current.close();
                    setSelectedCar(null);
                }
            })
            .catch((error) => {
                console.error("Error updating car:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update car information.",
                    icon: "error",
                    confirmButtonText: "Try Again"
                });
            });
    };


    const closeModal = () => {
        setSelectedCar(null);
        updateModalRef.current.close();
    };

    return (
        <div className=" bg-linear-to-br from-gray-50 to-blue-50 py-4 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        My Car Fleet
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage your vehicle listings, update availability, and track your rental business
                    </p>
                    <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-xl mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Cars</p>
                                <p className="text-2xl font-bold text-gray-900">{cars.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-xl mr-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Available</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {cars.filter(car => car?.status === "Available").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-xl mr-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Booked</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {cars.filter(car => car?.status === "Unavailable").length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cars Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Table Header */}
                    <div className="px-6 py-4 bg-linear-to-r from-gray-900 to-blue-900">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Vehicle Inventory</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-200 text-sm">
                                    Showing {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-linear-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Vehicle Details
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Daily Rate
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cars.map(car => (
                                    <tr
                                        key={car?._id}
                                        className="hover:bg-blue-50/50 transition-all duration-200 group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={car?.image}
                                                    alt={car?.name}
                                                    className="w-12 h-12 rounded-lg shadow-sm"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {car?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{car?.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {car?.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <span className="text-lg font-bold text-gray-900">${car?.price}</span>
                                                <span className="text-sm text-gray-500 ml-1">/day</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${car?.status === "Available"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}>
                                                {car?.status === "Available" ? (
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {car?.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleUpdateModalOpen(car)}
                                                    className="inline-flex items-center px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-sm"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car?._id)}
                                                    className="inline-flex items-center px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-sm"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {cars?.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
                                                <p className="text-gray-500">Get started by adding your first car to the fleet.</p>
                                                <button onClick={() => navigate('/addCar')} className="inline-flex items-center px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg mt-4">
                                                    <i className="fa-solid fa-car"></i>
                                                    <span className='ml-2'>Add Car</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Update Modal */}
                <dialog ref={updateModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-4xl p-0 bg-linear-to-br from-white to-gray-50 border border-gray-200 shadow-2xl">
                        {selectedCar && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900">Update Vehicle Information</h2>
                                        <p className="text-gray-600 mt-2">Modify your car details and pricing</p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleUpdate} className="space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Left Column */}
                                        <div className="space-y-6">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-semibold text-gray-700 text-lg">Car Name</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    defaultValue={selectedCar?.name}
                                                    required
                                                    className="input input-bordered w-full focus:input-primary bg-white/80 backdrop-blur-sm text-lg py-3"
                                                    placeholder="Enter car model and brand"
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-semibold text-gray-700 text-lg">Description</span>
                                                </label>
                                                <textarea
                                                    name="description"
                                                    defaultValue={selectedCar?.description}
                                                    required
                                                    rows="4"
                                                    className="textarea textarea-bordered w-full focus:textarea-primary bg-white/80 backdrop-blur-sm resize-none"
                                                    placeholder="Describe your car's features and condition"
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-semibold text-gray-700 text-lg">Category</span>
                                                </label>
                                                <select
                                                    name="category"
                                                    defaultValue={selectedCar?.category}
                                                    className="select select-bordered w-full focus:select-primary bg-white/80 backdrop-blur-sm"
                                                >
                                                    <option value="Sedan">Sedan</option>
                                                    <option value="SUV">SUV</option>
                                                    <option value="Hatchback">Hatchback</option>
                                                    <option value="Luxury">Luxury</option>
                                                    <option value="Electric">Electric</option>
                                                    <option value="Sports">Sports</option>
                                                    <option value="Convertible">Convertible</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-6">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-semibold text-gray-700 text-lg">Daily Rate</span>
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-lg">$</span>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        defaultValue={selectedCar?.price}
                                                        required
                                                        min="0"
                                                        className="input input-bordered w-full pl-10 focus:input-primary bg-white/80 backdrop-blur-sm text-lg py-3"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-semibold text-gray-700 text-lg">Location</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    defaultValue={selectedCar?.location}
                                                    required
                                                    className="input input-bordered w-full focus:input-primary bg-white/80 backdrop-blur-sm text-lg py-3"
                                                    placeholder="City, State"
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-semibold text-gray-700 text-lg">Image URL</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="image"
                                                    defaultValue={selectedCar?.image}
                                                    className="input input-bordered w-full focus:input-primary bg-white/80 backdrop-blur-sm text-lg py-3"
                                                    placeholder="https://example.com/car-image.jpg"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-semibold text-gray-700">Your Name</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user?.displayName}
                                                        readOnly
                                                        className="input input-bordered w-full bg-gray-100/80 cursor-not-allowed text-gray-600"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-semibold text-gray-700">Your Email</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={user?.email}
                                                        readOnly
                                                        className="input input-bordered w-full bg-gray-100/80 cursor-not-allowed text-gray-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-action pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="btn btn-ghost hover:bg-gray-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary bg-linear-to-r from-blue-500 to-blue-600 border-none hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Update Vehicle
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                    <form method="dialog" className="modal-backdrop bg-black/60 backdrop-blur-sm">
                        <button onClick={closeModal}>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
}