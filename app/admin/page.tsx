import { getAdminAnalytics } from "@/actions/analytics";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic"; // Ensure live data on every load

export default async function AdminPage() {
    const { chartData, stats } = await getAdminAnalytics();

    return <AdminDashboard chartData={chartData} stats={stats} />;
}
