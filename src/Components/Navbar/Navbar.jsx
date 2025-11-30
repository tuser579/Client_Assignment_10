import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css'
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { ArchiveRestore } from 'lucide-react';
import { Globe } from 'lucide-react';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }

    const links = <>
        <li>
            <NavLink to='/' className="flex items-center px-3 py-2 hover:rounded-sm hover:bg-white hover:bg-opacity-10 hover:text-[#3498db] transition-all">
                <i className="fas fa-home"></i> Home
            </NavLink>
        </li>
        {
            user && <>
                <li>
                    <NavLink to='/addCar' className="flex items-center px-3 py-2 hover:rounded-sm hover:bg-white hover:bg-opacity-10 hover:text-[#3498db] transition-all">
                        <i className="fa-solid fa-car"></i> Add Car
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/myListings' className="flex items-center px-3 py-2 hover:rounded-sm hover:bg-white hover:bg-opacity-10 hover:text-[#3498db] transition-all">
                        <i className="fa-solid fa-table-list"></i> My Listings
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/myBookings' className="flex items-center px-3 py-2 hover:rounded-sm hover:bg-white hover:bg-opacity-10 hover:text-[#3498db] transition-all">
                        <ArchiveRestore size={13} strokeWidth={1.8} absoluteStrokeWidth /> My Bookings
                    </NavLink>
                </li>
            </>
        }
        <li>
            <NavLink to='/browseCars' className="flex items-center px-3 py-2 hover:rounded-sm hover:bg-white hover:bg-opacity-10 hover:text-[#3498db] transition-all">
                <Globe size={13} strokeWidth={1.8} absoluteStrokeWidth /> Browse Cars
            </NavLink>
        </li>
    </>

    return (
        <div className="navbar bg-[#2c3e50] text-white sm:p-3 shadow-custom sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                        {links}
                    </ul>
                </div>
                <a href="/" className="flex items-center text-2xl font-bold">
                    <img className='w-14 h-14 rounded-full sm:mt-1' src="/logo2.png" alt="" />
                    <span className='hidden text-blue-500 sm:block'>Rent<span className='text-blue-300'>Wheels</span></span>
                </a>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="w-12 btn btn-ghost btn-circle avatar">
                            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-blue-100 space-y-3 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li className='text-green-600 text-center'>{user?.displayName}</li>
                            <li className='text-green-600 text-center'>{user?.email}</li>
                            <li className='mx-auto'><button onClick={handleSignOut} className="bg-accent text-white px-4 py-2 rounded hover:bg-red-700 transition-all">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button></li>
                        </ul>
                    </div>
                    :
                    <div className="flex flex-row space-x-1 md:space-y-0 md:space-x-2 md:w-auto">
                        <NavLink to='/login' className="border border-white text-white px-2 sm:px-4 sm:py-2 rounded flex items-center justify-center bg-green-600 hover:bg-white hover:text-[#2c3e50] transition-all">
                            <i className="fas fa-sign-in-alt mr-2"></i> Login
                        </NavLink>
                        <NavLink to='/register' className="bg-[#3498db] text-white px-2 sm:px-4 py-1 sm:py-2 rounded flex items-center justify-center hover:bg-blue-600 transition-all">
                            <i className="fas fa-user-plus mr-2"></i> Signup
                        </NavLink>
                    </div>}
            </div>
        </div>
    );
};

export default Navbar;