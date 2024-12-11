import { useEffect, useState } from "react";
import axios from "axios";
import { css } from '@linaria/core';

const mainStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem; /* pt-16 */
  padding-bottom: 1rem; /* pb-4 */
`;

const containerStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 4rem; /* gap-16 */
  min-height: 0; /* min-h-0 */
`;

const contentStyle = css`
  max-width: 300px; /* max-w-[300px] */
  width: 100%; /* w-full */
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* space-y-6 */
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem; /* px-4 */
`;

export function Welcome() {
  const [secretMessage, setSecretMessage] = useState();

  useEffect(() => {
    axios.get('/api/secure/hello').then((response) => {
      setSecretMessage(response.data?.message);
    });
  }, []);

  return (
    <main className={mainStyle}>
      <div className={containerStyle}>
        <div className={contentStyle}>
          {secretMessage}
        </div>
      </div>
    </main>
  );
}
