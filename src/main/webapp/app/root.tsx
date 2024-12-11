import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLoaderData,
} from "react-router";
import "./http/axios.ts";
import { AuthProvider } from "react-oidc-context";
import { useAuth } from "react-oidc-context";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import SecuredContent from "~/components/secured-content";
import axios from "axios";

export async function loader() {
    const response = await axios.get("/api/public/oauth2/info");
    return response.data
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

function Navbar() {
    const auth = useAuth();

    if (!auth) {
        console.error("AuthProvider context is undefined");
        return null;
    }

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">My App</h1>
                <div>
                    {auth.isAuthenticated ? (
                        <>
                            <span className="mr-4">Welcome, {auth.user?.profile.email}!</span>
                            <button
                                className="bg-red-500 px-4 py-2 rounded"
                                onClick={() => auth.removeUser()}
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-blue-500 px-4 py-2 rounded"
                            onClick={() => auth.signinRedirect()}
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}


export function Layout({ children }: { children: React.ReactNode }) {
    const authConfig = useLoaderData<typeof loader>();

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
            <title></title>
        </head>
        <body>
            {authConfig && <AuthProvider {...authConfig}>
                <Navbar/>
                <SecuredContent>{children}</SecuredContent>
            </AuthProvider>}
            <ScrollRestoration />
            <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
