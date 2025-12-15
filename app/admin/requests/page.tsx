import { getPendingRequests } from "@/actions/subject-request";
import RequestList from "@/components/admin/RequestList";

export default async function RequestsPage() {
    const requests = await getPendingRequests();

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                    Subject Requests
                </h1>
                <p className="text-zinc-400 mt-2">
                    Review and process student requests for new subjects.
                </p>
            </header>

            <RequestList initialRequests={requests} />
        </div>
    );
}
