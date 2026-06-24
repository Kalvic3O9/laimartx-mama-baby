import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { requireAdminSession } from "@/lib/adminGuard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  requireAdminSession("/admin");

  return <AdminDashboardClient />;
}
