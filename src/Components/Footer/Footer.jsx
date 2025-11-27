import React from 'react';

const Footer = () => {
    return (
        <div className="bg-[#2c3e50] text-white pt-12 pb-6 mt-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <p className="flex items-center text-2xl font-bold">
                            <img className='w-14 h-14 rounded-full sm:mt-1' src="/logo2.png" alt="" />
                            <span className='hidden text-blue-500 sm:block'>Rent<span className='text-blue-300'>Wheels</span></span>
                        </p>
                        <p>Rent the Ride. Own the Journey.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[#3498db] mb-4">Contact Info</h3>
                        <p className="flex items-center text-gray-300 mb-2">
                            <i className="fas fa-map-marker-alt mr-3"></i> 123 Dhaka Street, Bashundhara City
                        </p>
                        <p className="flex items-center text-gray-300 mb-2">
                            <i className="fas fa-phone mr-3"></i> +88 01712121212
                        </p>
                        <p className="flex items-center text-gray-300">
                            <i className="fas fa-envelope mr-3"></i> rentwheels@gmail.com
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[#3498db] mb-4">Terms & Conditions</h3>
                        <a href="" className="flex items-center text-gray-300 mb-2 hover:text-[#3498db] transition-colors">
                            <i className="fas fa-shield-alt mr-3"></i> Privacy Policy
                        </a>
                        <a href="" className="flex items-center text-gray-300 mb-2 hover:text-[#3498db] transition-colors">
                            <i className="fas fa-file-contract mr-3"></i> Terms of Service
                        </a>
                        <a href="" className="flex items-center text-gray-300 hover:text-[#3498db] transition-colors">
                            <i className="fas fa-cookie mr-3"></i> Cookie Policy
                        </a>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[#3498db] mb-4">Social Media Links</h3>
                        <div className="flex space-x-4">
                            <a href="" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#3498db] transition-colors">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#3498db] transition-colors">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#3498db] transition-colors">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#3498db] transition-colors">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="pt-6 border-t border-gray-500 text-center text-gray-400">
                    <p>&copy; 2025 RentWheels. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;