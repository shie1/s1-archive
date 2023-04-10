import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ResponsiveAppBar from '@/components/nav';

const theme = createTheme({
  palette: {
    mode: 'dark',
    contrastThreshold: 3,
    primary: {
      main: '#f71735',
    },
    secondary: {
      main: '#41ead4',
    },
    background: {
      paper: 'black',
      default: '#011627',
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header>
        <ResponsiveAppBar />
      </header>
      <Container sx={(theme) => ({ padding: theme.spacing(2) })}>
        <main>
          <Component {...pageProps} />
        </main >
      </Container>
      <footer>

      </footer>
    </ThemeProvider >
    <source id='global-player' />
  </>)
}
