import { AdminProductsClient } from "@/components/admin/AdminProductsClient";
import { requireAdminSession } from "@/lib/adminGuard";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  requireAdminSession("/admin/products");

  return <AdminProductsClient />;
}
