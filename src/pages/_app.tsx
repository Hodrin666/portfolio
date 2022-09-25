/**
 * Module dependencies.
 */

import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

/**
 * `GlobalStyle` styled component.
 */

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
    margin: 0;
    padding: 0;
  }

	canvas {
		background-color: black;
	}
`;

/**
 * `Theme` theme provider.
 */

const theme = {
	colors: {
		primary: '#000',
	},
};

/**
 * Function `App` page.
 */

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

/**
 * Export `MyApp` page.
 */

export default MyApp;
