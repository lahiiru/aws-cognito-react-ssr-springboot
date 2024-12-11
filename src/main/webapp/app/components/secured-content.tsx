import React, {type PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

const SecuredContent: React.FC<PropsWithChildren> = (props) => {
    const auth = useAuth();
    const [authState, setAuthState] = useState(false);

    useEffect(() => {
        if (!auth) {
            console.error("AuthProvider context is undefined");
            return;
        }

        // Initial state based on isAuthenticated
        setAuthState(auth.isAuthenticated);

        // Event listeners for user loaded and unloaded
        const handleUserLoaded = (user: any) => {
            localStorage.setItem("token", user?.access_token);
            setAuthState(true);
        };

        const handleUserUnloaded = () => {
            localStorage.removeItem("token");
            setAuthState(false);
        };

        auth.events.addUserLoaded(handleUserLoaded);
        auth.events.addUserUnloaded(handleUserUnloaded);

        // Cleanup event listeners on unmount
        return () => {
            auth.events.removeUserLoaded(handleUserLoaded);
            auth.events.removeUserUnloaded(handleUserUnloaded);
        };
    }, [auth]);

    if (auth?.isLoading) {
        return (
            <div className="flex justify-center items-center mt-40">
                <p className="text-lg">Please wait. Verifying your session...</p>
            </div>
        );
    }

    if (!authState) {
        return (
            <div className="flex justify-center items-center mt-40">
                <p className="text-lg">You are not authenticated.</p>
            </div>
        );
    }

    return <main className="container mx-auto mt-4">{props.children}</main>;
};

export default SecuredContent;
