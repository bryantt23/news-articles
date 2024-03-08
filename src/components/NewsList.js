import React, { useState } from 'react';
import { NewsItem } from "./NewsItem";

const NewsList = ({ travelStoriesData }) => {
    const [expandedUrl, setExpandedUrl] = useState(null)
    console.log("🚀 ~ NewsList ~ travelStoriesData:", travelStoriesData)
    if (!travelStoriesData?.results) {
        console.error('No results found in travelStoriesData:', travelStoriesData);
        return <p>Loading...</p>;
    }

    const toggleExpanded = (url) => {
        setExpandedUrl(expandedUrl === url ? null : url);
    }

    return (
        <main>
            <h1>NY Times Travel News</h1>
            <ul>
                {travelStoriesData.results.map((story) => (
                    <NewsItem
                        key={story.url}
                        story={story}
                        isExpanded={story.url === expandedUrl}
                        toggleExpanded={() => toggleExpanded(story.url)}
                    />
                ))}
            </ul>
        </main>
    );
};

export default NewsList;
