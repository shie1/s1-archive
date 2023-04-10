import { apiCall } from "@/components/api";
import type { NextPage } from "next";
import { collection } from "../api/collections/[id]";
import Image from "next/image";
import { Badge, BadgeProps, Stack, Table, TableHead, TableRow, TableBody, Typography, styled, useMediaQuery, useTheme, TableCell, IconButton } from "@mui/material";
import { PlayArrow, Queue } from "@mui/icons-material";
import { PlayerContext, usePlayerControls } from "../_app";
import { useContext } from "react";
import Head from "next/head";

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
        </Head>
        <Stack direction={breakImage ? "column" : "row"} spacing={2} alignItems="center">
            <StyledBadge badgeContent={collection.items.length} color="secondary" overlap="rectangular" anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Image alt={collection.collection.name} height={250} width={250} src={collection.collection.image ? collection.collection.image : `/img/collections/${collection.collection.id}.jpg`}></Image>
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
        collection: await apiCall("GET", `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://archive.shie1bi.hu"}/api/collections/${ctx.query.id}`)
    }
};

export default Collection;