
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
                    <li key={story.url}>
                        <h2>{story.title}</h2>
                        <p>{story.abstract}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default NewsList;
