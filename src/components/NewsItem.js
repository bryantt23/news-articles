import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Drawer, Box, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const NewsItem = ({ story, isExpanded, toggleExpanded }) => {
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
                    {isExpanded ? story.abstract : `${story.abstract.substring(0, 100)}...`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={toggleExpanded}>
                    {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
                <Button size="small" component="a" href={story.url} target="_blank" rel="noopener noreferrer"
                    endIcon={<OpenInNewIcon />}>
                    Go to article
                </Button>
            </CardActions>
        </Card>
    );
};