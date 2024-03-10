import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Drawer, FormControlLabel, Grid, Typography } from '@mui/material';
import ArticlePreview from './ArticlePreview';
import NewsItem from './NewsItem';

const NewsList = ({ travelStoriesData }) => {
    const [expandedUrl, setExpandedUrl] = useState(null);
    const [sections, setSections] = useState([]);
    const [selectedSections, setSelectedSections] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (travelStoriesData?.results?.length) {
            const uniqueSections = Array.from(new Set(travelStoriesData.results.map(story => story.section)));
            setSections(uniqueSections);
            setSelectedSections(uniqueSections.reduce((acc, section) => ({ ...acc, [section]: false }), {}));
            setFilteredData(travelStoriesData.results);
            setLoading(false);
        } else {
            setLoading(false);
            setError(true);
        }
    }, [travelStoriesData]);

    const handleCheckboxChange = (section) => {
        setSelectedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    useEffect(() => {
        if (!loading && !error) {
            const selectedFilters = Object.entries(selectedSections).filter(([section, isSelected]) => isSelected).map(([section]) => section);
            if (selectedFilters.length === 0) {
                setFilteredData(travelStoriesData.results);
            } else {
                const filtered = travelStoriesData.results.filter(story => selectedFilters.includes(story.section));
                setFilteredData(filtered);
            }
        }
    }, [selectedSections, loading, error, travelStoriesData]);

    const clearFilters = () => {
        setSelectedSections(prev => Object.keys(prev).reduce((acc, section) => ({ ...acc, [section]: false }), {}));
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading articles.</Typography>;

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h2" component="h2" gutterBottom>NY Times Travel News</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                {sections.map(section => (
                    <FormControlLabel
                        key={section}
                        control={
                            <Checkbox
                                checked={selectedSections[section] || false}
                                onChange={() => handleCheckboxChange(section)}
                            />
                        }
                        label={section}
                    />
                ))}
                <Button variant="outlined" onClick={clearFilters}>Clear Filters</Button>
            </Box>
            <Drawer anchor="top" open={expandedUrl !== null} onClose={() => setExpandedUrl(null)}>
                <ArticlePreview article={filteredData.find(story => story.url === expandedUrl)} onClose={() => setExpandedUrl(null)} />
            </Drawer>
            <Typography variant="h4" >{filteredData.length} articles found</Typography>
            <Grid container spacing={2}>
                {filteredData.map((story, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <NewsItem
                            story={story}
                            isExpanded={story.url === expandedUrl}
                            toggleExpanded={() => setExpandedUrl(story.url)}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default NewsList;
