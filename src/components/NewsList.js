import React, { useState } from 'react';
import { NewsItem } from "./NewsItem";
import { Drawer, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const NewsList = ({ travelStoriesData }) => {
    const [opened, { open, close }] = useDisclosure(true);
    const [expandedUrl, setExpandedUrl] = useState(null)
    console.log("🚀 ~ NewsList ~ travelStoriesData:", travelStoriesData)
    if (!travelStoriesData?.results) {
        console.error('No results found in travelStoriesData:', travelStoriesData);
        return <p>Loading...</p>;
    }

    const expandedStory = travelStoriesData.results.find(story => story.url === expandedUrl);

    const toggleExpanded = (url) => {
        setExpandedUrl(expandedUrl === url ? null : url);
    }

    return (
        <>
            <Button onClick={() => console.log('Test Button Clicked!')} color="violet" variant="outline">
                Test Mantine Button
            </Button>
            <h1>NY Times Travel News</h1>
            <Group>

                <Drawer
                    opened={expandedUrl !== null} // Control based on URL
                    onClose={() => setExpandedUrl(null)}
                    title="Article Details"
                    // padding="xl"
                    // size="xl"
                    position="top"
                >
                    <h1>hiii</h1>
                    Display article details when URL is expanded
                    {expandedStory && (
                        <div>
                            <h2>{expandedStory.title}</h2>
                            <p>{expandedStory.abstract}</p>
                            {/* ... */}
                            <Button onClick={() => setExpandedUrl(null)}>Close</Button>
                        </div>
                    )}
                </Drawer>
            </Group>
            {expandedUrl}
            <Group position="bottom">

                {travelStoriesData.results.map((story) => (
                    <NewsItem
                        key={story.url}
                        story={story}
                        isExpanded={story.url === expandedUrl}
                        toggleExpanded={() => toggleExpanded(story.url)}
                    />
                ))}
            </Group>

        </>
    );
};

export default NewsList;
