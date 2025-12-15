export default function CookiePage() {
    return (
        <>
            <div className="mb-8 border-b border-white/10 pb-8">
                <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">Cookie Policy</h1>
                <p className="text-sm font-mono text-zinc-500">Last Updated: December 2025</p>
            </div>

            <section className="space-y-6">
                <p>
                    Student Study Hub uses cookies and similar technologies to help provide, protect, and improve the Student Study Hub Platform. This policy explains how and why we use these technologies and the choices you have.
                </p>

                <h2>1. What are cookies?</h2>
                <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a site. They enable the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time, so you don&apos;t have to keep re-entering them whenever you come back to the site or browse from one page to another.
                </p>

                <h2>2. How We Use Cookies</h2>
                <p>
                    We use cookies for the following purposes:
                </p>
                <ul>
                    <li><strong>Authentication:</strong> We use cookies to verify your account and determine when you&apos;re logged in so we can make it easier for you to access the Services and show you the appropriate experience and features. We use <strong>Clerk</strong> for authentication services.</li>
                    <li><strong>Security:</strong> We use cookies to help us keep your account, data and the Student Study Hub services safe and secure.</li>
                    <li><strong>Analytics:</strong> We use cookies to better understand how people use the Services and improve them.</li>
                    <li><strong>Preferences:</strong> We use cookies to remember your settings and preferences.</li>
                </ul>

                <h2>3. Your Choices</h2>
                <p>
                    Most browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
                </p>
            </section>
        </>
    );
}
