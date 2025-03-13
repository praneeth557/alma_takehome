import { Metadata } from 'next';
import { AdminNav } from '@/components/AdminNav';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Alma',
  description: 'Lead management dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}