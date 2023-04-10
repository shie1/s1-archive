import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, ThemeProvider, createTheme, CssBaseline, Paper, Stack, Typography, IconButton } from '@mui/material';
import ResponsiveAppBar from '@/components/nav';
import Image from 'next/image';
import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useRef } from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    contrastThreshold: 5,
    primary: {
      main: '#f71735',
    },
    secondary: {
      main: '#41ead4',
    },
    background: {
      paper: '#000000',
      default: '#161616',
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  const footer = useRef<null | HTMLDivElement>(null)

  return (<>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header>
        <ResponsiveAppBar />
      </header>
      <Container sx={(theme) => ({ padding: theme.spacing(2), flex: 1 })}>
        <main style={{ paddingBottom: footer.current?.clientHeight }}>
          <Component {...pageProps} />
        </main >
      </Container>
      <footer ref={footer} style={{ position: 'fixed', bottom: 0, width: '100vw' }}>
        <Paper>
          <Container sx={(theme) => ({ padding: theme.spacing(1), flex: 1 })}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Image src="/img/collections/1.jpg" alt="" width={50} height={50} />
                <Typography fontSize="1.5rem" variant="body1" color="text.secondary">
                  title
                </Typography>
              </Stack>
              <Stack direction="row">
                <IconButton>
                  <SkipPrevious />
                </IconButton>
                <IconButton>
                  <PlayArrow />
                </IconButton>
                <IconButton>
                  <SkipNext />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Paper>
      </footer>
    </ThemeProvider >
    <source id='global-player' />
  </>)
}
