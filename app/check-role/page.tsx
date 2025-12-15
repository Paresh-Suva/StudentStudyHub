import { redirect } from "next/navigation";

export default async function CheckRolePage() {
    // Universal redirect to Home for all users (Admin & Students)
    return redirect("/");
}
