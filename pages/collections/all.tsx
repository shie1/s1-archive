import LibraryCard from "@/components/card";
import type { NextPage } from "next";
import { ImageList, ImageListItem, useTheme, useMediaQuery } from "@mui/material"
import { apiCall } from "@/components/api";
import { collectionSummary } from "../api/collections/all";

const Library: NextPage = (props: any) => {
    const theme = useTheme()
    const breakList = [useMediaQuery(theme.breakpoints.down('sm')), useMediaQuery(theme.breakpoints.down('md'))]

    return (<>
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