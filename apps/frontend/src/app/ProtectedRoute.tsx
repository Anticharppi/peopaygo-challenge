'use client';

import { PropsWithChildren, useLayoutEffect } from 'react';
import { useAuth } from '../lib/hooks';
import { redirect } from 'next/navigation';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, token } = useAuth().getTokenAndUser();

  const onInit = () => {
    if (!user || !token) {
      redirect('/sign-in');
    }
  };

  useLayoutEffect(onInit, [user, token]);

  return children;
};
