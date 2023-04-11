import { apiCall } from "@/components/api";
import type { NextPage } from "next";
import Image from "next/image";
import { group } from "../api/groups/[id]";
import { Avatar, Badge, BadgeProps, Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import Head from "next/head";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        fontSize: "1.5rem",
        height: "2rem",
        width: "2rem",
        borderRadius: "100%"
    },
}));

const Group: NextPage = (props: any) => {
    const group: group = props.group;
    const theme = useTheme()
    const breakImage = useMediaQuery(theme.breakpoints.down('sm'))

    return (<>
        <Head>
            <title>{group.name} • archv</title>
            <meta name="description" content={group.description} />
            {/* Facebook Meta Tags */}
            <meta property="og:url" content={`https://archive.shie1bi.hu/groups/${group.id}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={group.name} />
            <meta property="og:description" content={group.description} />
            <meta property="og:image" content={group.image ? group.image : `https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/groups/${group.id}.jpg`} />
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="archive.shie1bi.hu" />
            <meta property="twitter:url" content={`https://archive.shie1bi.hu/groups/${group.id}`} />
            <meta name="twitter:title" content={group.name} />
            <meta name="twitter:description" content={group.description} />
            <meta name="twitter:image" content={group.image ? group.image : `https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/groups/${group.id}.jpg`} />
        </Head>
        <Stack direction={breakImage ? "column" : "row"} spacing={2} alignItems="center">
            <StyledBadge badgeContent={group.items} color="secondary" overlap="circular" anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Avatar sx={(theme) => ({ width: 250, height: 250 })} src={group.image ? group.image : `https://cdn.jsdelivr.net/gh/shie1/s1-archive-files/groups/${group.id}.jpg`}></Avatar>
            </StyledBadge>
            <Stack>
                <Stack direction="row">
                    <Typography variant="h2" component="h1">{group.name}</Typography>
                </Stack>
                <Typography variant="body1">{group.description}</Typography>
            </Stack>
        </Stack>
    </>);
};

Group.getInitialProps = async (ctx) => {
    return {
        group: await apiCall("GET", `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://archive.shie1bi.hu"}/api/groups/${ctx.query.id}`)
    }
}

export default Group;