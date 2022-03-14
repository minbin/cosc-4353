import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ useAuth }) {
  let auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}
