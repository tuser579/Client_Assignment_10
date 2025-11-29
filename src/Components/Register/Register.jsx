import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
import 'animate.css'

const Register = () => {
    const { createUser, changeProfile, signInWithGoogle } = use(AuthContext);

    // const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();

    const notify = (error) => toast.error(`${error}`, {
        duration: 4000,
        position: 'top-center',
        style: {
            background: '#f87171',
            color: '#fff',
            border: '1px solid #f43f5e',
            padding: '12px 16px',
            fontWeight: '500',
        },
        icon: '⚠️',
    });


    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase) {
            // setError('Password must include an uppercase letter');
            notify('Password must include an uppercase letter');
            return;
        }
        if (!hasLowercase) {
            // setError('Password must include a lowercase letter');
            notify('Password must include a lowercase letter');
            return;
        }
        if (!isLongEnough) {
            // setError('Password must be at least 6 characters long');
            notify('Password must be at least 6 characters long');
            return;
        }

        createUser(email, password)
            .then(result => {
                // console.log(result.user);
                // setError("");

                // update user profile
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                changeProfile(result.user, profile)
                    .then(() => { })
                    .catch()

                navigate('/');
            })
            .catch(error => {
                // console.log('error happened', error.message);
                // setError(error.message);
                notify(error.message);
            })
    }

    const handleTogglePasswordShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                // console.log(error);
                // setError(error.message);
                notify(error.message);
            })
    }

    return (
        <div style={{
            backgroundImage: "url('/photo-1588421357538-7c22591e4f90.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }} className='py-10'>
            <div className="card w-full mx-auto max-w-sm shrink-0 shadow-2xl bg-blue-100 rounded-none sm:rounded-lg">

                {/* for notification  */}
                <Toaster></Toaster>

                <div className="card-body">
                    <h1 className="text-3xl sm:text-4xl text-center font-bold text-blue-600 animate__animated animate__backInDown">Sign Up</h1>
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset">

                            {/* name field */}
                            <label className="label font-semibold">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    className="input pl-6.5"
                                    placeholder="Enter Your Name"
                                />
                                <i className="fa-solid fa-user absolute left-2.5 top-5.5 transform -translate-y-1/2 text-gray-400"></i>
                            </div>

                            {/* user photo */}
                            <label className="label font-semibold">Photo URL</label>
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    name="photo"
                                    className='input pl-6.5'
                                    placeholder="Your Photo URL"
                                />
                                <i className="fa-solid fa-image absolute left-2.5 top-5.5 transform -translate-y-1/2 text-gray-400"></i>
                            </div>

                            {/* email field */}
                            <label className="label font-semibold">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    className="input pl-6.5"
                                    placeholder="Enter Your Email"
                                />
                                <i className="fa-solid fa-envelope absolute left-2.5 top-5.5 transform -translate-y-1/2 text-gray-400"></i>
                            </div>

                            {/* password field */}
                            <label className="label font-semibold">Password</label>
                            <div class="relative">
                                <input
                                    type={showPassword ? 'password' : 'text'}
                                    name="password"
                                    class="input pl-6.5"
                                    placeholder="Password"
                                />
                                <i class="fa-solid fa-lock absolute left-3 top-5.5 transform -translate-y-1/2 text-gray-400"></i>
                                <button onClick={handleTogglePasswordShow} className="btn btn-xs absolute top-2 right-5">{showPassword ? <Eye strokeWidth={1.5} /> : <EyeClosed strokeWidth={1.5} />}</button>
                            </div>

                            <button className="btn btn-neutral mt-4 bg-[#2c3e50] text-[1.3rem] font-semibold hover:bg-white hover:text-[#2c3e50] mb-2">Signup</button>

                        </fieldset>
                    </form>
                    {/* sign in with google */}
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] text-[1.3rem] font-semibold hover:bg-blue-500 hover:text-white">
                        <svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    {
                        // error && <p className='text-red-500'>{error}</p>           
                    }
                    <p className=''>Already have an account? Please <Link to='/login' className='text-blue-500 hover:font-semibold'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;