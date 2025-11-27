import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = use(AuthContext);

    const location = useLocation();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-transparent border-r-transparent border-b-blue-500 border-l-purple-500"></div>
                <p className="text-gray-600 font-medium">Loading...</p>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} to='/login'></Navigate>;
};

export default PrivateRoute;