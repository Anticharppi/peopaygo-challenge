'use client';

import { PropsWithChildren } from 'react';
import { useAuth } from '../lib/hooks';
import { redirect } from 'next/navigation';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { getTokenAndUser } = useAuth();
  const { user, token } = getTokenAndUser();

  if (!user || !token) {
    return redirect('/sign-in');
  }
  return children;
};
