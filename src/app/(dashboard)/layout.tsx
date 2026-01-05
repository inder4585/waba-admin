import { authOptions } from '@/lib/auth';
import MainLayout from './main-layout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return <MainLayout>{children}</MainLayout>;
}
