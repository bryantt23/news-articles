import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { NewsItem } from './NewsItem';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
        <div style={{ padding: 20 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                NY Times Travel News
            </Typography>
            <Drawer
                anchor="top"
                open={expandedUrl !== null}
                onClose={() => setExpandedUrl(null)}
            >
                <Box p={2} width="auto">
                    <IconButton onClick={() => setExpandedUrl(null)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" component="h2">Article Preview</Typography>
                    {expandedStory && (
                        <Box>
                            <Typography variant="h5" component="h3">{expandedStory.title}</Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {expandedStory.byline} - {new Date(expandedStory.created_date).toLocaleDateString()}
                            </Typography>
                            <Typography paragraph>{expandedStory.abstract}</Typography>
                            {expandedStory.multimedia && expandedStory.multimedia[0] && (
                                <Box display="flex" justifyContent="center">
                                    <img src={expandedStory.multimedia[0].url} alt={`Image ${expandedStory.multimedia[0] + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
                                </Box>
                            )}
                            <Button size="small" component="a" href={expandedStory.url} target="_blank" rel="noopener noreferrer"
                                endIcon={<OpenInNewIcon />}>
                                Go to article
                            </Button>
                            <Button onClick={() => setExpandedUrl(null)}>Close</Button>
                        </Box>
                    )}
                </Box>
            </Drawer>
            <Grid container spacing={2}>
                {travelStoriesData.results.map((story, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <NewsItem
                            story={story}
                            isExpanded={story.url === expandedUrl}
                            toggleExpanded={() => toggleExpanded(story.url)}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default NewsList;
