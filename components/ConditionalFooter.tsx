"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();

    // Hidden footer routes
    const hiddenRoutes = ["/sign-in", "/sign-up", "/register", "/login", "/admin"];
    const isHidden = hiddenRoutes.some((route) => pathname.startsWith(route));

    if (isHidden) return null;

    return <Footer />;
}
