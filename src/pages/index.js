import NewsList from "@/components/NewsList";
import { fetchTravelStories } from '../services/nyTimesApi'

export async function getStaticProps() {
    const travelStoriesData = await fetchTravelStories();
    return { props: { travelStoriesData: travelStoriesData || null } };
}

export default function Index({ travelStoriesData }) {
    return (
        <NewsList travelStoriesData={travelStoriesData} />
    );
}
