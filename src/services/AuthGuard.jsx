import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from './AuthService';

const AuthGuard = () => {
    const authUser = AuthService.getAuthUser();
    return authUser ? <Outlet /> : <Navigate to={'/signup'} replace />
}

export default AuthGuard