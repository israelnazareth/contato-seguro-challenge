import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    /* outline: none; */
  }

  body, html {
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea {
    font: 400 1rem sans-serif;
  }
`;
