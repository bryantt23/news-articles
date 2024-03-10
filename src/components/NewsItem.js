import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const NewsItem = ({ story, toggleExpanded }) => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            {story.multimedia?.length > 0 && (
                <CardMedia
                    component="img"
                    height="160"
                    image={story.multimedia[0].url}
                    alt={story.title}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {story.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${story.abstract.substring(0, 50)}...`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={toggleExpanded}>Preview
                </Button>
                <Button size="small" component="a" href={story.url} target="_blank" rel="noopener noreferrer"
                    endIcon={<OpenInNewIcon />}>
                    Go to article
                </Button>
            </CardActions>
        </Card>
    );
};

export default NewsItem