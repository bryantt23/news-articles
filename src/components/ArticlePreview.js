import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ArticlePreview = ({ article, onClose }) => {
    return (
        <Box p={2} width="auto">
            <IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2">Article Preview</Typography>
            {article && (
                <Box>
                    <Typography variant="h5" component="h3">{article.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {article.byline} - {new Date(article.created_date).toLocaleDateString()}
                    </Typography>
                    <Typography paragraph>{article.abstract}</Typography>
                    {article.multimedia && article.multimedia[0] && (
                        <Box display="flex" justifyContent="center">
                            <img src={article.multimedia[0].url} alt={`Image ${article.multimedia[0].url}`} style={{ maxWidth: '50%', height: 'auto' }} />
                        </Box>
                    )}
                    <Button size="small" component="a" href={article.url} target="_blank" rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}>
                        Go to article
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </Box>
            )}
        </Box>
    );
};

export default ArticlePreview;
