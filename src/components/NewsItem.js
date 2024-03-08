
const NewsItem = ({ story }) => {
    return (
        <li key={story.url}>
            <h2>{story.title}</h2>
            <p>{story.abstract}</p>
            <a href={story.url} target="_blank" rel="noopener noreferrer">Read full article</a>
        </li>
    );
};

export default NewsItem;
