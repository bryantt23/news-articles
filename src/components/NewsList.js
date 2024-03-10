import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Drawer, Box, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NewsItem } from './NewsItem';

const NewsList = ({ travelStoriesData }) => {
    const [expandedUrl, setExpandedUrl] = useState(null);

    console.log("🚀 ~ NewsList ~ travelStoriesData:", travelStoriesData);
    if (!travelStoriesData?.results) {
        console.error('No results found in travelStoriesData:', travelStoriesData);
        return <Typography>Loading...</Typography>;
    }

    const expandedStory = travelStoriesData.results.find(story => story.url === expandedUrl);

    const toggleExpanded = (url) => {
        setExpandedUrl(expandedUrl === url ? null : url);
    }

    return (
        <>
            <Button onClick={() => console.log('Test Button Clicked!')} variant="outlined" color="primary">
                Test Material UI Button
            </Button>
            <Typography variant="h4" component="h1" gutterBottom>
                NY Times Travel News
            </Typography>
            <Stack direction="row" spacing={2} marginBottom={2}>

                <Drawer
                    anchor="top"
                    open={expandedUrl !== null}
                    onClose={() => setExpandedUrl(null)}
                >
                    <Box p={2} width="auto">
                        <IconButton onClick={() => setExpandedUrl(null)}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" component="h2">Article Details</Typography>
                        {expandedStory && (
                            <Box>
                                <Typography variant="h5" component="h3">{expandedStory.title}</Typography>
                                <Typography paragraph>{expandedStory.abstract}</Typography>
                                {/* ... */}
                                <Button onClick={() => setExpandedUrl(null)}>Close</Button>
                            </Box>
                        )}
                    </Box>
                </Drawer>
            </Stack>
            {expandedUrl}
            <Stack direction="row" spacing={2} justifyContent="flex-start">

                {travelStoriesData.results.map((story) => (
                    <NewsItem
                        key={story.url}
                        story={story}
                        isExpanded={story.url === expandedUrl}
                        toggleExpanded={() => toggleExpanded(story.url)}
                    />
                ))}
            </Stack>
        </>
    );
};
export default NewsList;
