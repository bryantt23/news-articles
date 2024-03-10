import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticlePreview from './ArticlePreview';

jest.mock('next/image', () => {
    const ImageMock = ({ src, alt }) => <img src={src} alt={alt} />;
    ImageMock.displayName = 'Image';
    return ImageMock;
});

const mockArticle = {
    title: "Test Article",
    byline: "By Test Author",
    created_date: "2024-03-09T05:30:14-05:00",
    abstract: "This is a test abstract.",
    multimedia: [{ url: "https://example.com/test-image.jpg" }],
    url: "https://example.com/test-article"
};

describe('ArticlePreview', () => {
    it('renders correctly', () => {
        render(<ArticlePreview article={mockArticle} onClose={() => { }} />);

        expect(screen.getByText("Article Preview")).toBeInTheDocument();
        expect(screen.getByText("Test Article")).toBeInTheDocument();
        expect(screen.getByText("By Test Author - 3/9/2024")).toBeInTheDocument();
        expect(screen.getByText("This is a test abstract.")).toBeInTheDocument();
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockArticle.multimedia[0].url); expect(screen.getByRole('link')).toHaveAttribute('href', mockArticle.url);
    });

    it('closes when the close button is clicked', () => {
        const handleClose = jest.fn();
        render(<ArticlePreview article={mockArticle} onClose={handleClose} />);

        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
