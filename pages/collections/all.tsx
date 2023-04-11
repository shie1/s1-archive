import LibraryCard from "@/components/card";
import type { NextPage } from "next";
import { ImageList, ImageListItem, useTheme, useMediaQuery } from "@mui/material"
import { apiCall } from "@/components/api";
import { collectionSummary } from "../api/collections/all";
import Head from "next/head";

const Library: NextPage = (props: any) => {
    const theme = useTheme()
    const breakList = [useMediaQuery(theme.breakpoints.down('sm')), useMediaQuery(theme.breakpoints.down('md'))]

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
        <ImageList variant="masonry" cols={(() => {
            switch (breakList.indexOf(true)) {
                case 0:
                    return 1
                case 1:
                    return 2
                default:
                    return 3
            }
        })()} gap={8}>
            {(props.collections as Array<collectionSummary>).map((item, index) => {
                return (<ImageListItem sx={{ display: 'flex', justifyContent: 'center' }} key={index}>
                    <LibraryCard {...item} />
                </ImageListItem>)
            })}
        </ImageList>
    </>)
}

Library.getInitialProps = async () => {
    return {
        collections: await apiCall("GET", `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://archive.shie1bi.hu"}/api/collections/all`)
    }
}

export default Library;