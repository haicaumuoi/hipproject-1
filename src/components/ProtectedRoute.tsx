import React from 'react'
import { Navigate } from 'react-router-dom';


function ProtectedRoute({user, children}: any) {
    if(user.email === '') {
        return <Navigate to="/login" replace />;
    }
  return children;
}


export default ProtectedRoute