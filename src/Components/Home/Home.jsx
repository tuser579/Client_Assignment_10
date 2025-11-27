import React from 'react';
import HeroSlider from '../Hero Slider/HeroSlider';
import { useLoaderData } from 'react-router';
import CarCard from '../CarCard/CarCard';
import RentSection from '../RentSection/RentSection';
import TopRatedCars from '../TopRatedCars/TopRatedCars';
import CustomerTestimonials from '../CustomerTestimonials/CustomerTestimonials';

const topRatedCars = fetch('http://localhost:2005/topRatedCars').then(res => res.json());

const Home = () => {
    const cars = useLoaderData();
    // console.log(cars);
    return (
        <div>
            <HeroSlider></HeroSlider>
            <CarCard cars={cars}></CarCard>
            <RentSection></RentSection>
            <TopRatedCars topRatedCars={topRatedCars}></TopRatedCars>
            <CustomerTestimonials></CustomerTestimonials>
        </div>
    );
};

export default Home;