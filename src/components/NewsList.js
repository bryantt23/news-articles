import NewsItem from "./NewsItem";

const NewsList = ({ travelStoriesData }) => {
    console.log("🚀 ~ NewsList ~ travelStoriesData:", travelStoriesData)
    if (!travelStoriesData?.results) {
        console.error('No results found in travelStoriesData:', travelStoriesData);
        return <p>Loading...</p>;
    }

    return (
        <main>
            <h1>Travel News</h1>
            <ul>
                {travelStoriesData.results.map((story) => (
                    <NewsItem key={story.url} story={story} />
                ))}
            </ul>
        </main>
    );
};

export default NewsList;
