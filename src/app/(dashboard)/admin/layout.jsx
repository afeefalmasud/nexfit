import { requireRole } from '@/lib/actions/role';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export default async function AdminLayout({ children }) {
  // Server-side guard stays intact
  await requireRole('admin');

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}