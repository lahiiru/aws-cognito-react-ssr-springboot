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
import { globalStyles } from "~/appStyles";
import { css } from '@linaria/core';

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

const navbarStyle = css`
  background-color: #2d3748;
  color: #fff;
  padding: 1rem;
`;

const containerStyle = css`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
`;

const titleStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
`;

const buttonStyle = css`
  background-color: #4299e1;
  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 0.25rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const signOutButtonStyle = css`
  background-color: #ef4444;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: #fff;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const mainStyle = css`
  padding-top: 4rem;
  padding: 1rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const preStyle = css`
  width: 100%;
  padding: 1rem;
  overflow-x: auto;
`;

function Navbar() {
    const auth = useAuth();

    if (!auth) {
        console.error("AuthProvider context is undefined");
        return null;
    }

    return (
        <nav className={navbarStyle}>
            <div className={containerStyle}>
                <h1 className={titleStyle}>My App</h1>
                <div>
                    {auth.isAuthenticated ? (
                        <>
                            <span className="mr-4">Welcome, {auth.user?.profile.email}!</span>
                            <button
                                className={signOutButtonStyle}
                                onClick={() => auth.removeUser()}
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <button
                            className={buttonStyle}
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
        <html lang="en" className={globalStyles}>
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
        <main className={mainStyle}>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className={preStyle}>
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
