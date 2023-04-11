import { Button, Typography, Stack, Divider, Box, useMediaQuery } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'
import Head from 'next/head';

const Home: NextPage = () => {
  const disableAnimation = useMediaQuery("(max-width: 800px)")

  return (<>
    <Head>
      <title>archv</title>
      <meta name="description" content='Az összes luvzee, Shie1bi, Benskies és xX_gyuszyu_Xx dal egy helyen.' />
      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://archv.shie1bi.hu/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="archv from Shie1bi" />
      <meta property="og:description" content='Az összes luvzee, Shie1bi, Benskies és xX_gyuszyu_Xx dal egy helyen.' />
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="archv.shie1bi.hu" />
      <meta property="twitter:url" content="https://archv.shie1bi.hu/" />
      <meta name="twitter:title" content="archv from Shie1bi" />
      <meta name="twitter:description" content='Az összes luvzee, Shie1bi, Benskies és xX_gyuszyu_Xx dal egy helyen.' />
    </Head>
    <Stack spacing={2} sx={(theme) => ({ padding: `${theme.spacing(8)} 0` })}>
      <Stack direction="row" spacing={2}>
        <Typography whiteSpace="pre-wrap" variant='h1' component="h1">
          /archv
        </Typography>
      </Stack>
      <Typography variant='h2' component="h2">
        <span>Minden </span>
        {disableAnimation ? <span>dal</span> :
          <TypeAnimation sequence={[
            'luvzee',
            1000,
            'Shie1bi',
            1000,
            'Benskies',
            1000,
            'gyuszyu',
            1000,
            'dal',
            2000
          ]} wrapper='span' repeat={Infinity} cursor={false} />}
        <span> egy helyen.</span>
      </Typography>
      <Stack direction='row'>
        <Button size="large" variant='contained' href='/collections/all' LinkComponent={Link}>Felfedezés</Button>
      </Stack>
      <Box sx={(theme) => ({ padding: `${theme.spacing(2)} 0` })}>
        <Divider />
      </Box>
      <Typography variant='h3' component="h3">
        Mi az archv?
      </Typography>
      <Typography variant='body1' component="p">
        Az <i>archv</i> egy streaming platform ahol az összes luvzee, Shie1bi, Benskies és xX_gyuszyu_Xx dal egy helyen található. Az ötlet onnan eredt, hogy a 2023-mas <i>vakságból kiérve</i> luvzee lemezt előre ki akartam adni valahol, így csináltam egy teljesen saját platformot. Az ötlet utólag jött, hogy megőrizhetnék minden zenei alkotásomat egy helyen.
      </Typography>
    </Stack>
  </>)
}

export default Home