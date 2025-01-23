import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt-verify';

export default async function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <>{children}</>;
} 