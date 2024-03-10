import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsList from './NewsList';
import ArticlePreview from './ArticlePreview';
import NewsItem from './NewsItem';

// Mock ArticlePreview and NewsItem since we're focusing on NewsList behavior
jest.mock('./ArticlePreview', () => (props) => (<div>MockArticlePreview {props.article && props.article.title}</div>));
jest.mock('./NewsItem', () => (props) => (<div>MockNewsItem {props.story && props.story.title}</div>));

const mockTravelStoriesData = {
    results: [
        {
            title: "Test Article 1",
            abstract: "Abstract 1",
            url: "http://testurl1.com",
            section: "section1",
            multimedia: [{ url: "http://imageurl1.com" }]
        },
        {
            title: "Test Article 2",
            abstract: "Abstract 2",
            url: "http://testurl2.com",
            section: "section2",
            multimedia: [{ url: "http://imageurl2.com" }]
        },
        // More articles if necessary
    ],
};

describe('NewsList', () => {
    it('renders loading state initially', () => {
        render(<NewsList travelStoriesData={null} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('renders error state if there is an error', () => {
        render(<NewsList travelStoriesData={{}} />);
        expect(screen.getByText(/Error loading articles./i)).toBeInTheDocument();
    });

    it('renders list of articles after loading', () => {
        render(<NewsList travelStoriesData={mockTravelStoriesData} />);

        expect(screen.getByText(/NY Times Travel News/)).toBeInTheDocument();
        expect(screen.getByText(/Test Article 1/)).toBeInTheDocument();
        expect(screen.getByText(/Test Article 2/)).toBeInTheDocument();
        expect(screen.getByText('2 articles found')).toBeInTheDocument();
    });

    it('filters articles based on section when checkbox is clicked', () => {
        render(<NewsList travelStoriesData={mockTravelStoriesData} />);

        // Initial check for all articles
        expect(screen.getByText(/Test Article 1/)).toBeInTheDocument();
        expect(screen.getByText(/Test Article 2/)).toBeInTheDocument();

        // Simulate user clicking the checkbox for section1
        fireEvent.click(screen.getByLabelText(/section1/));

        // Expect only the article from section1 to be visible
        expect(screen.getByText(/Test Article 1/)).toBeInTheDocument();
        expect(screen.queryByText(/Test Article 2/)).not.toBeInTheDocument();

        // Clear the filters
        fireEvent.click(screen.getByText(/Clear Filters/));

        // Expect all articles to be visible again
        expect(screen.getByText(/Test Article 1/)).toBeInTheDocument();
        expect(screen.getByText(/Test Article 2/)).toBeInTheDocument();
    });
});
