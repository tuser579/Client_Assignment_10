import React, { useState, useEffect } from 'react';
import { Typewriter } from "react-simple-typewriter";


const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Carousel slides data
    const carouselSlides = [
        {
            id: 1,
            title: "Premium Car Rental Experience",
            description: "Discover the perfect vehicle for your journey with our extensive fleet of well-maintained cars",
            image: "/banner-image2.webp",
        },
        {
            id: 2,
            title: "Flexible Rental Plans",
            description: "Daily, weekly, or monthly rentals with competitive pricing and no hidden charges",
            image: "/banner2.jpg",
        },
        {
            id: 3,
            title: "Trusted by Thousands",
            description: "Join our community of satisfied customers who trust us for their transportation needs",
            image: "/public/car-showroom-automotive-retail-new-cars-cars-driving-automotive-vehicle-storage_605423-50371.jpg",
        }
    ];

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000); // Change slide every 5 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [carouselSlides.length]);

    // Optional: Manual navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    };

    return (
        <div className="pb-15 bg-gray-50">

            {/* Hero Banner / Carousel */}
            <div className="relative h-96 md:h-139 overflow-hidden">
                {carouselSlides.map((slide, index) => (
                    <div key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}>
                        <div
                            className="w-full h-full bg-cover bg-center mx-auto"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
                                <div className="text-center text-white border-white px-4">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 mx-auto">
                                        <Typewriter
                                            words={[slide.title]}
                                            loop={false}
                                            cursor
                                            cursorStyle="|"
                                            typeSpeed={70}
                                            deleteSpeed={50}
                                            delaySpeed={1500}
                                        />
                                    </h1>
                                    <p className="px-5 text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Previous and Next Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 p-2 rounded-full transition duration-300"
                >
                    ‹
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 p-2 rounded-full transition duration-300"
                >
                    ›
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 mx-auto">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HeroSlider;