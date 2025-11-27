import React from 'react';

const CustomerTestimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Business Traveler",
            rating: 5,
            comment: "The premium service and car quality exceeded my expectations. The BMW X5 was impeccable and made my business trips so comfortable. Will definitely rent again!",
            avatar: "/images/avatar1.jpg",
            carRented: "BMW X5"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Family Vacation",
            rating: 5,
            comment: "Rented a Toyota Camry for our family vacation. The process was seamless, the car was spotless, and the customer service was outstanding. Highly recommended!",
            avatar: "/images/avatar2.jpg",
            carRented: "Toyota Camry"
        },
        // {
        //     id: 3,
        //     name: "Emily Rodriguez",
        //     role: "Adventure Seeker",
        //     rating: 4,
        //     comment: "Perfect experience from start to finish. The Tesla Model 3 was incredible - eco-friendly and high-tech. The pickup and drop-off process was super convenient.",
        //     avatar: "/images/avatar3.jpg",
        //     carRented: "Tesla Model 3"
        // },
        // {
        //     id: 4,
        //     name: "David Wilson",
        //     role: "Daily Commuter",
        //     rating: 5,
        //     comment: "As a monthly renter, I appreciate the flexible plans and well-maintained vehicles. The Honda Civic has been reliable and fuel-efficient for my daily commute.",
        //     avatar: "/images/avatar4.jpg",
        //     carRented: "Honda Civic"
        // }
    ];

    const stats = [
        { number: "10,000+", label: "Happy Customers" },
        { number: "4.9/5", label: "Average Rating" },
        { number: "98%", label: "Recommend Us" },
        // { number: "24/7", label: "Support" }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it - hear from our satisfied customers about their rental experiences
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                {/* <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover mr-4"
                                /> */}
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-500">{testimonial.role}</p>
                                    <p className="text-sm text-blue-600">Rented: {testimonial.carRented}</p>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400 text-lg">
                                    {"★".repeat(testimonial.rating)}
                                    <span className="text-gray-300">{"★".repeat(5 - testimonial.rating)}</span>
                                </div>
                            </div>

                            <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                                "{testimonial.comment}"
                            </blockquote>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-blue-500">✓</span>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500">Verified Rental</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                        Trusted by Industry Leaders
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                        <div className="text-2xl font-bold text-gray-700">FORBES</div>
                        <div className="text-2xl font-bold text-gray-700">TRAVEL+</div>
                        <div className="text-2xl font-bold text-gray-700">AUTO★</div>
                        <div className="text-2xl font-bold text-gray-700">TRIPADVISOR</div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default CustomerTestimonials;