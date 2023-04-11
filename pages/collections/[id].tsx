import { apiCall } from "@/components/api";
import type { NextPage } from "next";
import Image from "next/image";
import { Badge, BadgeProps, Stack, Table, TableHead, TableRow, TableBody, Typography, styled, useMediaQuery, useTheme, TableCell, IconButton } from "@mui/material";
import { PlayArrow, Queue } from "@mui/icons-material";
import { PlayerContext } from "../_app";
import { useContext } from "react";
import Head from "next/head";
import { collection } from "../api/collections/[id]";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        fontSize: "1.5rem",
        height: "2rem",
        width: "2rem",
        borderRadius: "100%"
    },
}));

const Collection: NextPage = (props: any) => {
    const collection: collection = props.collection
    const theme = useTheme()
    const breakImage = useMediaQuery(theme.breakpoints.down('sm'))
    const hideNum = useMediaQuery("(max-width: 350px)")
    const hideArtist = useMediaQuery("(max-width: 310px)")
    const player = useContext(PlayerContext)

    return (<>
        <Head>
            <title>{collection.collection.name} • archv</title>
            <meta name="description" content={collection.collection.description} />
            {/* Facebook Meta Tags */}
            <meta property="og:url" content={`https://archv.shie1bi.hu/collections/${collection.collection.id}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${collection.collection.group} • ${collection.collection.name} (${(new Date(collection.collection.date)).getFullYear()})`} />
            <meta property="og:description" content={collection.collection.description} />
            <meta property="og:image" content={collection.collection.image ? collection.collection.image : `https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/collections/${collection.collection.id}.jpg`} />
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="archv.shie1bi.hu" />
            <meta property="twitter:url" content={`https://archv.shie1bi.hu/collections/${collection.collection.id}`} />
            <meta name="twitter:title" content={`${collection.collection.group} • ${collection.collection.name} (${(new Date(collection.collection.date)).getFullYear()})`} />
            <meta name="twitter:description" content={collection.collection.description} />
            <meta name="twitter:image" content={collection.collection.image ? collection.collection.image : `https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/collections/${collection.collection.id}.jpg`} />
        </Head>
        <Stack direction={breakImage ? "column" : "row"} spacing={2} alignItems="center">
            <StyledBadge badgeContent={collection.items.length} color="secondary" overlap="rectangular" anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Image alt={collection.collection.name} height={250} width={250} src={collection.collection.image ? collection.collection.image : `https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/collections/${collection.collection.id}.jpg`}></Image>
            </StyledBadge>
            <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h2" component="h1">{collection.collection.name}</Typography>
                </Stack>
                <Typography variant="h3" component="h2">{collection.collection.group}</Typography>
            </Stack>
        </Stack>
        <Typography sx={(theme) => ({ margin: `${theme.spacing(3)} 0`, textAlign: 'center', fontStyle: 'italic' })} variant="body1">{collection.collection.description}</Typography>
        <Table size="small" sx={(theme) => ({ marginTop: theme.spacing(2) })}>
            <TableHead>
                <TableRow>
                    <TableCell style={{ display: hideNum ? 'none' : 'table-cell' }}>
                        <Typography variant="body1">#</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body1">Cím</Typography>
                    </TableCell>
                    <TableCell style={{ display: hideArtist ? 'none' : 'table-cell' }}>
                        <Typography variant="body1">Előadó</Typography>
                    </TableCell>
                    <TableCell>

                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {collection.items.map((item, index) => {
                    return (<TableRow key={index}>
                        <TableCell style={{ display: hideNum ? 'none' : 'table-cell' }}>
                            <Typography variant="body1">{index + 1}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">{item.name}</Typography>
                        </TableCell>
                        <TableCell style={{ display: hideArtist ? 'none' : 'table-cell' }}>
                            <Typography variant="body1">{item.group_name}</Typography>
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={() => player?.setContent(item)}>
                                <PlayArrow />
                            </IconButton>
                            <IconButton onClick={() => {
                                player?.addToQueue(item)
                            }}>
                                <Queue />
                            </IconButton>
                        </TableCell>
                    </TableRow>)
                })}
            </TableBody>
        </Table>
    </>);
};

Collection.getInitialProps = async (ctx) => {
    return {
        collection: await apiCall("GET", `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://archv.shie1bi.hu"}/api/collections/${ctx.query.id}`)
    }
};

export default Collection;