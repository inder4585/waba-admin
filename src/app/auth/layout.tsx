import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Session } from 'next-auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <>{children}</>;
}
