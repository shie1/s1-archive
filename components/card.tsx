import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { MusicNote, PlayArrow, Share, Person } from "@mui/icons-material";
import { Stack } from '@mui/material';
import Link from 'next/link';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function LibraryCard({ id, name, group, image, date, items, type, description, group_id, group_image }: { id: number, name: string, group: string, image?: string, date: string, items: number, type: number, description: string, group_id: number, group_image?: string }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} src={image ? image : `/img/groups/${group_id}.jpg`} aria-label="recipe">{group}</Avatar>
                }
                action={
                    <Stack direction="row">
                        <IconButton aria-label="group" LinkComponent={Link} href={`/groups/${group_id}`}>
                            <Person />
                        </IconButton>
                        <IconButton aria-label="play">
                            <PlayArrow />
                        </IconButton>
                    </Stack>
                }
                title={group}
                subheader={(new Date(date)).toDateString()}
            />
            <Link style={{ cursor: 'pointer' }} href={`/collections/${id}`}>
                <CardMedia
                    component="img"
                    image={image ? image : `/img/collections/${id}.jpg`}
                    alt={name}
                />
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        {(() => {
                            switch (type) {
                                case 1:
                                    return <MusicNote />
                            }
                        })()}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions sx={{ justifyContent: "right" }} disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    A kollekció {items} elemet tartalmaz
                </Typography>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
            </CardActions>
        </Card>
    );
}