import React, { type PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { css } from '@linaria/core';

const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

const messageStyle = css`
  font-size: 1.125rem;
`;

const containerStyle = css`
  margin-top: 1rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

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
      <div className={loadingStyle}>
        <p className={messageStyle}>Please wait. Verifying your session...</p>
      </div>
    );
  }

  if (!authState) {
    return (
      <div className={loadingStyle}>
        <p className={messageStyle}>You are not authenticated.</p>
      </div>
    );
  }

  return <main className={containerStyle}>{props.children}</main>;
};

export default SecuredContent;
