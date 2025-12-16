import { checkUser } from "@/lib/check-user";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
    const user = await checkUser();

    return (
        <NavbarClient />
    );
}
