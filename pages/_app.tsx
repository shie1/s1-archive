import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  Stack,
  Typography,
  IconButton,
  Slider,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import ResponsiveAppBar from '@/components/nav';
import Image from 'next/image';
import {
  MoreVert,
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  Stop,
  VolumeDown,
  VolumeUp,
} from '@mui/icons-material';
import { createContext, useEffect, useRef, useState } from 'react';
import { content } from './api/collections/[id]';

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
  const [queue, setQueue] = useState<content[]>([])
  const [history, setHistory] = useState<content[]>([])
  const [volume, setVolume] = useState<number>(100)
  const addToQueue = (content: content) => {
    setQueue([...queue, content])
  }
  const [content, setContent] = useState<undefined | content>(undefined)

  return { playing, setPlaying, src, setSrc, queue, setQueue, addToQueue, history, setHistory, content, setContent, volume, setVolume }
}

export type playerControls = {
  playing: boolean
  setPlaying: (playing: boolean) => void
  src: string
  setSrc: (src: string) => void
  queue: content[]
  setQueue: (queue: content[]) => void
  addToQueue: (content: content) => void
  history: content[]
  setHistory: (history: content[]) => void
  content: undefined | content
  setContent: (content: undefined | content) => void
  volume: number
  setVolume: (volume: number) => void
}

export const PlayerContext = createContext<undefined | playerControls>(undefined)

export default function App({ Component, pageProps }: AppProps) {
  const footer = useRef<null | HTMLDivElement>(null)
  const pl = usePlayerControls()
  const player = useRef<HTMLAudioElement | null>(null)
  const breakControls = useMediaQuery("(max-width: 750px)")
  const [controlsOpen, setControlsOpen] = useState(false)
  const controlsAnchor = useRef<null | any>(null)

  const playerActions = {
    togglePlay: () => {
      if (player.current) {
        if (player.current.paused) {
          player.current.play()
        } else {
          player.current.pause()
        }
      }
    },
    next: () => {
      if (player.current) player.current.currentTime = player.current.duration;
    },
    previous: () => {
      if (player.current) {
        if (pl.content) pl.setQueue([pl.content, ...pl.queue])
        if (pl.history.length > 0) {
          pl.setContent(pl.history[pl.history.length - 1])
          pl.setHistory(pl.history.slice(0, pl.history.length - 1))
        }
      }
    },
    cancel: () => {
      pl.setQueue([])
      pl.setHistory([])
      pl.setContent(undefined)
      setControlsOpen(false)
    },
    toggleControls: () => {
      setControlsOpen(!controlsOpen)
    },
  }

  useEffect(() => {
    if (!breakControls) {
      setControlsOpen(false)
    }
  }, [breakControls])

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

  useEffect(() => {
    if (pl.content) {
      pl.setSrc(`https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/content/${pl.content.id}.mp3`)
    } else {
      pl.setSrc("")
    }
  }, [pl.content])

  useEffect(() => {
    if (!pl.content) {
      if (pl.queue.length > 0) {
        pl.setContent(pl.queue[0])
        pl.setQueue(pl.queue.slice(1))
      }
    }
  }, [pl.queue])

  useEffect(() => {
    if (player.current) {
      player.current.volume = pl.volume / 100
    }
  }, [pl.volume])

  return (<>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider theme={theme}>
      <PlayerContext.Provider value={pl}>
        <CssBaseline />
        <header>
          <ResponsiveAppBar />
        </header>
        <Container sx={(theme) => ({ padding: theme.spacing(2), flex: 1, width: '100vw' })}>
          <main style={{ paddingBottom: footer.current?.clientHeight }}>
            <Component {...pageProps} />
          </main >
        </Container>
        <footer ref={footer} style={{ position: 'fixed', bottom: 0, width: '100vw', transition: "height .2s", height: pl.src ? 66 : 0 }}>
          <Paper>
            <Container sx={(theme) => ({ padding: theme.spacing(1), flex: 1 })}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  {!pl.content ? <></> : <Image src={pl.content?.image ? pl.content.image : `https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/collections/${pl.content?.collection_id}.jpg`} alt="" width={50} height={50} />}
                  <Typography sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} fontSize="1.5rem" variant="body1" color="text.secondary">
                    {pl.content?.name}
                  </Typography>
                </Stack>
                <Stack spacing={2} alignItems="center" direction="row">
                  <Stack spacing={2} direction="row" alignItems="center">
                    {breakControls ?
                      <>
                        <IconButton ref={controlsAnchor} onClick={() => setControlsOpen(true)}>
                          <MoreVert />
                        </IconButton>
                        <Menu
                          open={controlsOpen}
                          onClose={() => setControlsOpen(false)}
                          anchorEl={controlsAnchor.current}
                          sx={{ '& .MuiPaper-root': { width: '100vw' } }}
                        >
                          <MenuItem>
                            <Stack sx={{ width: '100%' }} spacing={2} direction="row" alignItems="center">
                              <VolumeDown />
                              <Slider color='secondary' sx={{ width: '100%' }} max={100} min={0} aria-label="Volume" value={pl.volume} onChange={(e, v) => pl.setVolume(v as number)} />
                              <VolumeUp />
                            </Stack>
                          </MenuItem>
                          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                            <MenuItem onClick={playerActions.cancel}>
                              <Stack spacing={2} direction="row-reverse" alignItems="center" sx={(theme) => ({ padding: theme.spacing(.5), width: '100%' })}>
                                <Stop />
                                Megállítás
                              </Stack>
                            </MenuItem>
                            <MenuItem onClick={playerActions.previous}>
                              <Stack spacing={2} direction="row-reverse" alignItems="center" sx={(theme) => ({ padding: theme.spacing(.5), width: '100%' })}>
                                <SkipPrevious />
                                Előző
                              </Stack>
                            </MenuItem>
                            <MenuItem onClick={playerActions.togglePlay}>
                              <Stack spacing={2} direction="row-reverse" alignItems="center" sx={(theme) => ({ padding: theme.spacing(.5), width: '100%' })}>
                                {pl.playing ? <Pause /> : <PlayArrow />}
                                Lejátszás/Szünet
                              </Stack>
                            </MenuItem>
                            <MenuItem onClick={playerActions.next}>
                              <Stack spacing={2} direction="row-reverse" alignItems="center" sx={(theme) => ({ padding: theme.spacing(.5), width: '100%' })}>
                                <SkipNext />
                                Következő
                              </Stack>
                            </MenuItem>
                          </Stack>
                        </Menu>
                      </>
                      : <>
                        <Stack spacing={2} direction="row" alignItems="center">
                          <VolumeDown />
                          <Slider color='secondary' sx={{ width: '5rem' }} max={100} min={0} aria-label="Volume" value={pl.volume} onChange={(e, v) => pl.setVolume(v as number)} />
                          <VolumeUp />
                        </Stack>
                        <IconButton onClick={playerActions.cancel}>
                          <Stop />
                        </IconButton>
                        <IconButton onClick={playerActions.previous}>
                          <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={playerActions.togglePlay}>
                          {pl.playing ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={playerActions.next}>
                          <SkipNext />
                        </IconButton></>}
                  </Stack>
                </Stack>
              </Stack>
            </Container>
          </Paper>
        </footer>
        <audio autoPlay ref={player} id='global-player' src={pl.src} onPause={() => pl.setPlaying(false)} onPlay={() => pl.setPlaying(true)} onEnded={() => {
          if (pl.content) pl.setHistory([...pl.history, pl.content])
          if (pl.queue.length > 0) {
            pl.setContent(pl.queue[0])
            pl.setQueue(pl.queue.slice(1))
          } else {
            pl.setContent(undefined)
            setControlsOpen(false)
          }
        }} />
      </PlayerContext.Provider>
    </ThemeProvider >
  </>)
}
