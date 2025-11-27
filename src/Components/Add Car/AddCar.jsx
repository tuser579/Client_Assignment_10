import React, { use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext/AuthContext";


const AddCar = () => {
    const { user } = use(AuthContext);

    const [carData, setCarData] = useState({
        name: "",
        description: "",
        category: "Sedan",
        price: "",
        location: "",
        image: "",
        providerName: user.displayName,
        email: user.email,
        status: "Available",
    });

    const handleChange = (e) => {
        setCarData({ ...carData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // send data to the server
        fetch("http://localhost:2005/cars", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(carData)
        })
            .then(res => res.json())
            .then(data => {
                console.log("after post", data);

                toast.success("Car added successfully 🚗");

                // Reset form
                setCarData({
                    name: "",
                    description: "",
                    category: "Sedan",
                    price: "",
                    location: "",
                    image: "",
                    providerName: user.displayName,
                    email: user.email,
                    status: "Available",
                });
            })
    }
    return (
        // <div className="py-10">
        //     <form
        //         onSubmit={handleSubmit}
        //         className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
        //     >
        //         <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">Add Your Car</h2>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Car Name
        //             </label>
        //             <input
        //                 type="text"
        //                 name="name"
        //                 value={carData.name}
        //                 onChange={handleChange}
        //                 required
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Description
        //             </label>
        //             <textarea
        //                 name="description"
        //                 value={carData.description}
        //                 onChange={handleChange}
        //                 required
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Category
        //             </label>
        //             <select
        //                 name="category"
        //                 value={carData.category}
        //                 onChange={handleChange}
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //             >
        //                 <option value="Sedan">Sedan</option>
        //                 <option value="SUV">SUV</option>
        //                 <option value="Hatchback">Hatchback</option>
        //                 <option value="Luxury">Luxury</option>
        //                 <option value="Electric">Electric</option>
        //             </select>
        //         </div>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Rent Price (per day)
        //             </label>
        //             <input
        //                 type="number"
        //                 name="price"
        //                 value={carData.price}
        //                 onChange={handleChange}
        //                 required
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Location
        //             </label>
        //             <input
        //                 type="text"
        //                 name="location"
        //                 value={carData.location}
        //                 onChange={handleChange}
        //                 required
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Hosted Image URL
        //             </label>
        //             <input
        //                 type="text"
        //                 name="image"
        //                 value={carData.image}
        //                 onChange={handleChange}
        //                 required
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Provider Name
        //             </label>
        //             <input
        //                 type="text"
        //                 value={user.displayName}
        //                 readOnly
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">
        //                 Provider Email
        //             </label>
        //             <input
        //                 type="email"
        //                 value={user.email}
        //                 readOnly
        //                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
        //             />
        //         </div>

        //         <button
        //             type="submit"
        //             className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        //         >
        //             Add Car
        //         </button>
        //     </form>
        //     <ToastContainer position="top-center" />
        // </div>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat sm:py-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")' }}>
            <div className="min-h-screen bg-opacity-50">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md sm:rounded-2xl shadow-2xl overflow-hidden border border-white/20"
                >
                    {/* Header Section */}
                    <div className="bg-linear-to-r from-blue-600 to-purple-700 p-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">Add Your Car</h2>
                        <p className="text-blue-100 text-lg">List your vehicle and start earning today</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-8 space-y-6">
                        {/* Grid Layout for Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Car Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Car Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={carData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                    placeholder="Enter car model and brand"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={carData.description}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                                    placeholder="Describe your car's features and condition"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={carData.category}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
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

                            {/* Rent Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Rent Price (per day)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={carData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={carData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                    placeholder="City, State"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={carData.image}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                    placeholder="https://example.com/car-image.jpg"
                                />
                            </div>

                            {/* Provider Info - Read Only */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100/80 backdrop-blur-sm cursor-not-allowed text-gray-600 font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100/80 backdrop-blur-sm cursor-not-allowed text-gray-600 font-medium"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-blue-600 to-purple-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-800 focus:ring-4 focus:ring-blue-500/50 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Car to Listing
                                </span>
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Your car will be listed immediately after submission and available for booking
                            </p>
                        </div>
                    </div>
                </form>
                <ToastContainer
                    position="top-center"
                    toastClassName="rounded-xl shadow-lg"
                    progressClassName="bg-gradient-to-r from-blue-500 to-purple-600"
                />
            </div>
        </div>
    );
};

export default AddCar;