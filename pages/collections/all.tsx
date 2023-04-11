import LibraryCard from "@/components/card";
import type { NextPage } from "next";
import { useTheme, Grid, useMediaQuery } from "@mui/material"
import { apiCall } from "@/components/api";
import { collectionSummary } from "../api/collections/all";
import Head from "next/head";

const Library: NextPage = (props: any) => {
    const theme = useTheme()
    const centerGrid = useMediaQuery(theme.breakpoints.down('sm'))

    return (<>
        <Head>
            <title>Könyvtár • archv</title>
            <meta name="description" content='Az összes luvzee, Shie1bi, Benskies és xX_gyuszyu_Xx dal egy helyen.' />
            {/* Facebook Meta Tags */}
            <meta property="og:url" content="https://archive.shie1bi.hu/collections/all" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Könyvtár • archv from Shie1bi" />
            <meta property="og:description" content='Az összes luvzee, Shie1bi, Benskies és xX_gyuszyu_Xx dal egy helyen.' />
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="archive.shie1bi.hu" />
            <meta property="twitter:url" content="https://archive.shie1bi.hu/collections/all" />
            <meta name="twitter:title" content="Könyvtár • archv from Shie1bi" />
            <meta name="twitter:description" content='Az összes luvzee, Shie1bi, Benskies és xX_gyuszyu_Xx dal egy helyen.' />
        </Head>
        <Grid display="flex" justifyContent={centerGrid ? "center" : "left"} alignItems="center" container spacing={4}>
            {(props.collections as Array<collectionSummary>).map((item, index) => {
                return (<Grid item lg={4} md={6} sm={12} key={index} display="flex" justifyContent="center" alignItems="center">
                    <LibraryCard {...item} />
                </Grid>)
            })}
        </Grid>
    </>)
}

Library.getInitialProps = async () => {
    return {
        collections: await apiCall("GET", `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://archive.shie1bi.hu"}/api/collections/all`)
    }
}

export default Library;