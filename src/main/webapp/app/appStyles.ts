import { css } from '@linaria/core';

export const globalStyles = css`
  :global() {
    html,
    body {
      background-color: white;
      color-scheme: light;
      font-family: "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

      @media (prefers-color-scheme: dark) {
        background-color: #1a202c; /* dark:bg-gray-950 */
        color-scheme: dark;
      }
    }
  }
`;
