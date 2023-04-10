import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, ThemeProvider, createTheme, CssBaseline, Paper, Stack, Typography, IconButton, Button } from '@mui/material';
import ResponsiveAppBar from '@/components/nav';
import Image from 'next/image';
import { Cancel, CancelOutlined, Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

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

export const usePlayerControls = () => {
  const [playing, setPlaying] = useState(false)
  const [src, setSrc] = useState<string>("")
  const [queue, setQueue] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const addToQueue = (src: string) => {
    setQueue([...queue, src])
  }
  return { playing, setPlaying, src, setSrc, queue, setQueue, addToQueue, history, setHistory }
}

export default function App({ Component, pageProps }: AppProps) {
  const footer = useRef<null | HTMLDivElement>(null)
  const pl = usePlayerControls()
  const player = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (player.current) {
      if (pl.playing) {
        player.current?.play()
      } else {
        player.current?.pause()
      }
    }
  }, [pl.playing])

  useEffect(() => {
    if (player.current) {
      player.current.src = pl.src
    }
  }, [pl.src])

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
      <footer ref={footer} style={{ position: 'fixed', bottom: 0, width: '100vw', transition: "height .2s", height: pl.src ? 66 : 0 }}>
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
                <IconButton onClick={() => {
                  pl.setSrc("")
                  pl.setPlaying(false)
                }}>
                  <Cancel />
                </IconButton>
                <IconButton onClick={() => {
                  if (player.current) {
                    if (player.current.currentTime > 5) { player.current.currentTime = 0 } else {
                      if (pl.history.length > 0) {
                        pl.setSrc(pl.history[pl.history.length - 1])
                        pl.setHistory(pl.history.slice(0, pl.history.length - 1))
                      } else {
                        player.current.currentTime = 0
                      }
                    }
                  }
                }}>
                  <SkipPrevious />
                </IconButton>
                <IconButton onClick={() => pl.setPlaying(!pl.playing)}>
                  {pl.playing ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton onClick={() => {
                  if (player.current) player.current.currentTime = player.current.duration
                }}>
                  <SkipNext />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Paper>
      </footer>
      <audio autoPlay ref={player} id='global-player' src={pl.src} onPause={() => pl.setPlaying(false)} onPlay={() => pl.setPlaying(true)} onEnded={() => {
        pl.setHistory([...pl.history, pl.src])
        if (pl.queue.length > 0) {
          pl.setSrc(pl.queue[0])
          pl.setQueue(pl.queue.slice(1))
        } else {
          pl.setSrc("")
        }
      }} />
    </ThemeProvider >
  </>)
}
