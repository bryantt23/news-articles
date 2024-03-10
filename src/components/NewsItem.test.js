import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsItem from './NewsItem';

describe('NewsItem', () => {
    const mockStory = {
        title: "Test Article Title",
        abstract: "Test abstract content",
        url: "http://testurl.com",
        multimedia: [{ url: "http://imageurl.com" }],
    };

    it('renders NewsItem with content', () => {
        render(<NewsItem story={mockStory} toggleExpanded={() => { }} />);

        expect(screen.getByText("Test Article Title")).toBeInTheDocument();
        expect(screen.getByText(/Test abstract content/)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockStory.multimedia[0].url);
    });

    it('calls toggleExpanded when the preview button is clicked', () => {
        const mockToggleExpanded = jest.fn();
        render(<NewsItem story={mockStory} toggleExpanded={mockToggleExpanded} />);

        fireEvent.click(screen.getByText(/Preview/));
        expect(mockToggleExpanded).toHaveBeenCalled();
    });
});
