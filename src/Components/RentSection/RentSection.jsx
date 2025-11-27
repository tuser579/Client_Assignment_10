import React from 'react';

const RentSection = () => {

    const benefits = [
        {
            icon: '🚗',
            title: 'Easy Booking',
            description: 'Book your preferred car in just a few clicks with our user-friendly platform'
        },
        {
            icon: '💰',
            title: 'Affordable Rates',
            description: 'Competitive pricing with no hidden charges. Best value for your money'
        },
        {
            icon: '🏆',
            title: 'Trusted Providers',
            description: 'All our car providers are verified and maintain high-quality standards'
        },
        {
            icon: '📞',
            title: '24/7 Support',
            description: 'Round-the-clock customer support to assist you anytime, anywhere'
        }
    ];

    return (
        <div className="bg-gray-100 pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Why Rent With Us?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Experience the difference with our premium service
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300"
                        >
                            <div className="text-4xl mb-4">{benefit.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RentSection;