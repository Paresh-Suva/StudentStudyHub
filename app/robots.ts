import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/hidden/"], // Good practice to hide admin, though auth protects it
        },
        sitemap: "https://student-study-hub.vercel.app/sitemap.xml",
    };
}
