import type { JSX } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from './auth.context';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useAuth();

  if (loading) return null; // 🔥 Espera a que cargue

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};