import { Button, Typography, Stack } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'
import { CollectionsBookmark } from '@mui/icons-material';
import Head from 'next/head';

const Home: NextPage = () => {
  return (<>
    <Head>
      <title>archv</title>
      <meta name="description" content="Shie1bi archívum." />
    </Head>
    <Stack spacing={2} sx={(theme) => ({ padding: `${theme.spacing(8)} 0` })}>
      <Stack direction="row" spacing={2}>
        <Typography whiteSpace="pre-wrap" variant='h1' component="h1">
          /archv
        </Typography>
      </Stack>
      <Typography variant='h2' component="h2">
        <span>Minden </span>
        <TypeAnimation sequence={[
          'dal',
          2000,
          'videó',
          2000,
          'projekt',
          2000,
          'esemény',
          3000,
        ]} wrapper='span' repeat={Infinity} cursor={false} />
        <span> egy helyen.</span>
      </Typography>
      <Stack direction='row'>
        <Button size="large" variant='contained' href='/collections/all' LinkComponent={Link}>Felfedezés</Button>
      </Stack>
    </Stack>
  </>)
}

export default Home