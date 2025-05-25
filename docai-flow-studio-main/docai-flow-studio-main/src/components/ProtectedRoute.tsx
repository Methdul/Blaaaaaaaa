import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '@/lib/authUtils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Optional: For role-specific access
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    // User not authenticated, redirect to login
    console.log('ProtectedRoute: User not authenticated. Redirecting to /login. Auth token:', localStorage.getItem('authToken'), 'IsAuthenticated flag:', localStorage.getItem('isAuthenticated'));
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      // User authenticated but does not have the required role
      // Redirect to a "Not Authorized" page or homepage. For now, redirecting to homepage.
      // A dedicated "Not Authorized" page would be better UX.
      // Or, if only one role is allowed, a more specific message/redirect could be used.
      console.warn(`User with role '${userRole}' tried to access a route restricted to roles: ${allowedRoles.join(', ')}`);
      console.log('ProtectedRoute: User role check failed. User role:', userRole, 'Allowed roles:', allowedRoles, '. Redirecting to /.');
      return <Navigate to="/" replace />; 
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
