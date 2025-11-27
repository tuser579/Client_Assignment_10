import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
import 'animate.css';

const Login = () => {

    // const { signInUser, signInWithGoogle, setForgetEmail } = use(AuthContext);
    const { signInUser, signInWithGoogle } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(true);
    const emailRef = useRef();

    const location = useLocation();
    const navigate = useNavigate();
    // const navigate2 = useNavigate();
    // console.log(location);

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

    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                navigate(location?.state || '/');
            })
            .catch(error => {
                // console.log(error);
                notify(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    // const handleForgetPassword = () => {
    //     setForgetEmail(emailRef.current.value);
    //     navigate2('/forgetPath');
    // }

    const handleTogglePasswordShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div style={{
            backgroundImage: "url('/360_F_588119127_ai0xZYPNgiPvEebGlR19I0O90qF2SILQ.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }} className="py-10">
            <div className="card bg-blue-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl rounded-none sm:rounded-lg">

                {/* for notification  */}
                <Toaster></Toaster>

                <div className="card-body">
                    <h1 className="text-3xl text-center sm:text-4xl font-bold text-green-600 animate__animated animate__backInDown">Login</h1>
                    <form onSubmit={handleLogIn}>
                        <fieldset className="fieldset">

                            {/* email field */}
                            <label className="label font-semibold">Email</label>
                            <div className="relative">
                                <input
                                    ref={emailRef}
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

                            {/* for forget password */}
                            {/* <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div> */}

                            {/* for login button */}
                            <button className="btn btn-neutral mt-4 bg-[#2c3e50] text-[1.3rem] font-semibold hover:bg-white hover:text-[#2c3e50]">Login</button>
                        </fieldset>
                    </form>
                    {/* sign in with google */}
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] text-[1.3rem] font-semibold hover:bg-blue-500 hover:text-white">
                        <svg aria-label="Google logo" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className=''>New to our website? Please <Link to='/register' className='text-blue-500 hover:font-semibold'>Signup</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;