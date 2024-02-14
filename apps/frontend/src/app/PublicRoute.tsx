'use client';

import { PropsWithChildren } from 'react';
import { useAuth } from '../lib/hooks';
import { redirect } from 'next/navigation';

export const PublicRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { getTokenAndUser, signIn } = useAuth();
  const { user, token } = getTokenAndUser();

  if (user && token) {
    signIn(user);
    return redirect('/employees');
  }

  return children;
};
