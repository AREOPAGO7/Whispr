import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt-verify';
import React from 'react';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return async (props: any) => {
    const cookieStore = cookies();
    const session = (await cookieStore).get('session');

    if (!session?.value) {
      redirect('/');
    }

    try {
      await verifyToken(session.value);
    } catch (error) {
      redirect('/');
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;