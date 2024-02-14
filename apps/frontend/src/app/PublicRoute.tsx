'use client';

import { PropsWithChildren, useLayoutEffect } from 'react';
import { useAuth } from '../lib/hooks';
import { redirect } from 'next/navigation';

export const PublicRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { getTokenAndUser, injectUserInStore } = useAuth();
  const { user, token } = getTokenAndUser();

  const onInit = () => {
    if (user && token) {
      injectUserInStore(user);
      return redirect('/employees');
    }
  };

  useLayoutEffect(onInit, [user, token]);

  return children;
};
