import { createBrowserRouter } from 'react-router-dom' 

import AuthLayout from '../layouts/AuthLayout'; 
import GlobalToasterLayout from '../layouts/GlobalToasterLayout'; 

import LandingPage from '../pages/LandingPage'; 
import SignUpPage from '../pages/SignUpPage'; 
import OTPVerificationPage from '../pages/OTPVerificationPage'; 
import EnterSignUpDetails from '../pages/EnterSignUpDetails'; 
import UploadProfilePic from '../pages/UploadProfilePic'; 
import CheckEmailLoginPage from '../pages/CheckEmailLoginPage'; 
import CheckPasswordLoginPage from '../pages/CheckPasswordLoginPage'; 
import ForgotPasswordPage from '../pages/ForgotPasswordPage'; 
import Home from '../pages/Home'; 

import ErrorPage from '../pages/ErrorPage'; 


const router = createBrowserRouter([
    {
        path : '/', 
        element : (
            <GlobalToasterLayout>
                <LandingPage />
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/signup-enter-email', 
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <SignUpPage />
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/verify-email', 
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <OTPVerificationPage />
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/enter-details', 
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <EnterSignUpDetails />
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/upload-profile-pic-and-create-account', 
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <UploadProfilePic /> 
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/login-email', 
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <CheckEmailLoginPage />
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/login-password',
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <CheckPasswordLoginPage />
                </AuthLayout>
            </GlobalToasterLayout>
        ),        
        errorElement : <ErrorPage /> 
    },
    {
        path : '/forgot-passsword',
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <ForgotPasswordPage />
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/home',
        element : (
            <GlobalToasterLayout>
                <Home />
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    }
])


export default router; 