import { createBrowserRouter } from 'react-router-dom' 

import AuthLayout from '../layouts/AuthLayout'; 
import GlobalToasterLayout from '../layouts/GlobalToasterLayout'; 

import LandingPage from '../pages/LandingPage'; 
import SignUpPage from '../pages/SignUpPage'; 
import OTPVerificationPage from '../pages/OTPVerificationPage'; 
import EnterUsernameAndPassword from '../pages/EnterUsernameAndPassword'; 
import UploadProfilePicAndCreateAccount from '../pages/UploadProfilePicAndCreateAccount';
import CheckEmailLoginPage from '../pages/CheckEmailLoginPage'; 
import CheckPasswordLoginPage from '../pages/CheckPasswordLoginPage'; 
import ForgotPasswordPage from '../pages/ForgotPasswordPage'; 
import Home from '../pages/Home'; 

import Feed from '../bigger components/Feed'
import Profile from '../bigger components/Profile';

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
        path : '/signup-page', 
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
        path : '/enter-username-and-password', 
        element : (
            <GlobalToasterLayout>
                <AuthLayout>
                    <EnterUsernameAndPassword />
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage /> 
    },
    {
        path : '/upload-profile-pic-and-create-account', 
        element : (
            <GlobalToasterLayout>
                <UploadProfilePicAndCreateAccount />
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
                <CheckPasswordLoginPage />
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
        children : [
            {
                path : '/home',
                element : <Feed />
            },
            {
                path : 'profile',
                element : <Profile />
            }
        ],
        errorElement : <ErrorPage /> 
    }
])


export default router; 